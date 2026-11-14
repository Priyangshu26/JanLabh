function renderSchemeCards() {
  const container = document.getElementById('schemesGrid');
  const countEl = document.getElementById('resultsCount');
  if (!container) return;

  const filtered = currentCategory === 'All'
    ? eligibleSchemes
    : eligibleSchemes.filter(s => s.category.toLowerCase().includes(currentCategory.toLowerCase().slice(0, 4)));

  if (countEl) countEl.innerText = `${filtered.length} Scheme${filtered.length === 1 ? '' : 's'}`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full bg-white/95 p-8 text-center rounded-2xl shadow-sm">
        <i class="fa-regular fa-folder-open text-gray-400 text-3xl mb-2"></i>
        <h3 class="font-bold text-gray-800 text-sm">No schemes match these exact criteria in this category</h3>
        <p class="text-xs text-gray-500 mt-1">Try selecting "All" or adjusting your household income ceiling.</p>
      </div>
    `;
    return;
  }

  const savedIds = getSavedSchemeIds();
  const ownedDocs = getOwnedDocuments();

  container.innerHTML = filtered.map(scheme => {
    const isSaved = savedIds.includes(scheme.id);
    
    // Calculate document gap
    const totalDocs = scheme.documents?.length || 0;
    const haveDocs = (scheme.documents || []).filter(d => ownedDocs.includes(d)).length;
    const docPercent = totalDocs > 0 ? Math.round((haveDocs / totalDocs) * 100) : 100;

    // Deadline Calculation
    const deadlineText = calculateDeadline(scheme.timeline?.closeDate);

    return `
      <div class="interactive-card bg-white/95 backdrop-blur-sm rounded-2xl p-5 flex flex-col justify-between shadow-sm">
        
        <div>
          <!-- Header tags (Clean Fills without Outlines) -->
          <div class="flex items-start justify-between gap-2 mb-2">
            <span class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
              ${scheme.category}
            </span>
            <span class="text-[11px] font-semibold ${deadlineText.colorClass} px-2.5 py-1 rounded-lg">
              <i class="fa-regular fa-clock mr-1"></i>${deadlineText.label}
            </span>
          </div>

          <!-- Scheme Title & Ministry -->
          <h3 class="font-black text-base text-slate-900 leading-snug">${scheme.name}</h3>
          <p class="text-xs text-slate-500 mt-0.5">${scheme.ministry}</p>

          <!-- Benefit Highlight Box -->
          <div class="mt-3 p-3 rounded-xl bg-slate-50 border-l-4 border-[#046A38] text-xs">
            <div class="text-[10px] uppercase font-bold text-[#046A38]">${scheme.benefit?.type || 'Benefit'}</div>
            <div class="font-bold text-slate-900 mt-0.5">${scheme.benefit?.display}</div>
          </div>

          <!-- Document Readiness Progress Bar -->
          <div class="mt-3">
            <div class="flex items-center justify-between text-xs mb-1">
              <span class="font-semibold text-slate-600">Document Readiness</span>
              <span class="font-bold ${docPercent === 100 ? 'text-[#046A38]' : 'text-slate-800'}">${haveDocs}/${totalDocs} (${docPercent}%)</span>
            </div>
            <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div class="h-full ${docPercent === 100 ? 'bg-[#046A38]' : 'bg-[#FF671F]'}" style="width: ${docPercent}%"></div>
            </div>
          </div>
        </div>

        <!-- Action Footer -->
        <div class="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <button onclick="openExplainModal('${scheme.id}')" class="text-xs font-bold text-[#06038D] hover:underline flex items-center gap-1.5">
            <i class="fa-solid fa-circle-info"></i> Why Am I Eligible?
          </button>

          <button onclick="toggleSaveScheme('${scheme.id}')" class="text-xs font-bold px-3.5 py-2 rounded-xl transition-all ${
            isSaved 
              ? 'bg-[#046A38] text-white shadow-xs' 
              : 'bg-slate-100 text-[#06038D] hover:bg-blue-50'
          }">
            <i class="fa-solid ${isSaved ? 'fa-check' : 'fa-bookmark'} mr-1"></i>
            ${isSaved ? 'Saved in Hub' : 'Add to Hub'}
          </button>
        </div>

      </div>
    `;
  }).join('');
}
