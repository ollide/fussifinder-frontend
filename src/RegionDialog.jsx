import React, { useEffect, useRef, useState } from 'react';

import './RegionDialog.css';
import { useAppContext } from './FilterContext';
import { CheckIcon, CloseIcon, PinIcon } from './icons';
import {
    DEFAULT_KM, GROUPS, NEARBY, PERIMETERS, ZIP, groupByType, normalize, regionLabel, sameRegion, useRegions,
} from './regions';

// Name with the part matching the search in bold
const Highlight = ({ text, query }) => {
    const index = normalize(text).indexOf(normalize(query));
    if (!query || index < 0 || normalize(text).length !== text.length) {
        return text;
    }
    return <>
        {text.slice(0, index)}<strong>{text.slice(index, index + query.length)}</strong>{text.slice(index + query.length)}
    </>;
};

const search = (regions, query) => {
    const q = normalize(query);
    const hits = GROUPS.flatMap(group => (regions?.[group.key] || [])
        .filter(r => normalize(r.displayName).includes(q) || normalize(r.name).includes(q))
        .map(r => ({ type: group.type, name: r.name, displayName: r.displayName })));
    // names starting with the query first, otherwise keep the groups' order
    const starts = (r) => normalize(r.displayName).startsWith(q) ? 0 : 1;
    return hits.sort((a, b) => starts(a) - starts(b));
};

// Region picker: a bottom sheet on mobile, a centered dialog on desktop (CSS). Search over all regions,
// postal codes (3–5 digits) search around that place, recent regions as chips, and all regions by group.
const RegionDialog = ({ open, region, onSelect, onClose }) => {
    const dialogRef = useRef(null);
    const inputRef = useRef(null);
    const listRef = useRef(null);
    const regions = useRegions();
    const { recents, perimeter, isMobile } = useAppContext();
    const [query, setQuery] = useState('');
    const [tab, setTab] = useState(null); // null: the group of the current region

    useEffect(() => {
        const dialog = dialogRef.current;
        if (open && !dialog.open) {
            dialog.showModal();
            if (!isMobile) {
                inputRef.current.focus(); // not on phones: the keyboard would cover the list
            }
            // the current region in view (the list scrolls, not the dialog)
            const list = listRef.current;
            const selected = list?.querySelector('.is-selected');
            if (selected) {
                list.scrollTop = selected.offsetTop - list.offsetTop - (list.clientHeight - selected.offsetHeight) / 2;
            }
        } else if (!open && dialog.open) {
            dialog.close();
        }
    }, [open, isMobile]);

    // closed by Esc, the close button, the backdrop or a selection
    const handleClose = () => {
        setQuery('');
        setTab(null);
        onClose();
    };

    const onDialogClick = (e) => {
        if (e.target === dialogRef.current) {
            handleClose(); // click on the backdrop
        }
    };

    const q = query.trim();
    const isZipQuery = /^\d+$/.test(q);
    const km = Number(perimeter) / 1000;
    const results = !q ? null
        : isZipQuery ? (ZIP.test(q) ? [{ type: NEARBY, name: q, km: PERIMETERS.includes(km) ? km : DEFAULT_KM }] : [])
            : search(regions, q);

    const onSubmit = (e) => {
        e.preventDefault();
        if (results?.length) {
            onSelect(results[0]);
            setQuery('');
        }
    };

    const select = (selected) => {
        onSelect(selected);
        setQuery('');
        setTab(null);
    };

    const activeTab = tab ?? groupByType(region.type)?.key ?? 'cities';
    const activeGroup = GROUPS.find(g => g.key === activeTab);

    return (
        <dialog ref={dialogRef} className="region-dialog" aria-labelledby="region-dialog-title"
            onClose={handleClose} onClick={onDialogClick}>
            <div className="region-dialog-inner">
                <div className="region-dialog-head">
                    <h2 id="region-dialog-title">Region wählen</h2>
                    <button className="region-dialog-close" aria-label="Schließen" onClick={handleClose}>
                        <CloseIcon />
                    </button>
                </div>

                <form className="region-search" role="search" onSubmit={onSubmit}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" /></svg>
                    <input ref={inputRef} type="search" value={query} onChange={e => setQuery(e.target.value)}
                        aria-label="Region oder Postleitzahl suchen" placeholder="Stadt, Kreis, Verband oder PLZ"
                        autoComplete="off" enterKeyHint="search" />
                </form>

                {results ?
                    <div className="region-dialog-body">
                        <p className="region-results-count" aria-live="polite">
                            {isZipQuery && !results.length ? 'Postleitzahl: 3 bis 5 Ziffern'
                                : results.length === 1 ? '1 Treffer' : `${results.length} Treffer`}
                        </p>
                        <ul className="region-results">
                            {results.map(r => (
                                <li key={`${r.type}-${r.name}`}>
                                    <button className="region-result" onClick={() => select(r)}>
                                        {r.type === NEARBY ? <>
                                            <span className="region-result-name"><PinIcon size={16} className="icon-pin" /><span>Umkreis von <strong>{r.name}</strong></span></span>
                                            <span className="region-type">{r.km}&nbsp;km</span>
                                        </> : <>
                                            <span className="region-result-name"><Highlight text={r.displayName} query={q} /></span>
                                            <span className="region-type">{groupByType(r.type).typeLabel}</span>
                                        </>}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div> :
                    <div className="region-dialog-body">
                        <div className="region-section">
                            <h3 className="section-label">Zuletzt</h3>
                            <div className="chips">
                                {recents.map(r => {
                                    const current = sameRegion(r, region);
                                    return (
                                        <button key={`${r.type}-${r.name}`} className={'chip' + (current ? ' is-active' : '')}
                                            aria-current={current ? 'true' : undefined} onClick={() => select(r)}>
                                            {current ? <CheckIcon /> : r.type === NEARBY && <PinIcon size={16} className="icon-pin" />}
                                            <span>{regionLabel(r)}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="segmented region-tabs" role="tablist" aria-label="Regionsart">
                            {GROUPS.map(g => (
                                <button key={g.key} role="tab" id={`region-tab-${g.key}`}
                                    aria-selected={g.key === activeTab} aria-controls="region-tabpanel"
                                    className={'segment' + (g.key === activeTab ? ' is-active' : '')}
                                    onClick={() => setTab(g.key)}>
                                    {g.label}
                                    {regions && <span className="region-tab-count">{regions[g.key]?.length ?? 0}</span>}
                                </button>
                            ))}
                        </div>

                        <ul ref={listRef} key={activeTab} className="region-list" role="tabpanel" id="region-tabpanel"
                            aria-labelledby={`region-tab-${activeTab}`}>
                            {!regions && <li className="region-list-info">Regionen werden geladen…</li>}
                            {(regions?.[activeTab] || []).map(r => {
                                const selected = region.type === activeGroup.type && region.name === r.name;
                                return (
                                    <li key={r.name}>
                                        <button className={'region-item' + (selected ? ' is-selected' : '')}
                                            aria-current={selected ? 'true' : undefined}
                                            onClick={() => select({ type: activeGroup.type, name: r.name, displayName: r.displayName })}>
                                            <span>{r.displayName}</span>
                                            {selected && <CheckIcon size={16} strokeWidth={2.5} />}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>}
            </div>
        </dialog>
    );
};

export default RegionDialog;
