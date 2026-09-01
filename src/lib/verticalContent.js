// Shared helpers for the vertical/service-page CMS (Industrial/Food/Chemicals/Manpower).
// See supabase/vertical_content.sql for the backing table — one row per (page, section).

// Merge a DB row's `data` over a section's default. Shallow merge, except array fields:
// if the DB data defines an array for a given key (including at the top level for
// rawList sections like `products`/`stats`), it's used wholesale; otherwise the
// default array is kept.
export function mergeSectionData(defaultData, dbData) {
  if (dbData === undefined || dbData === null) return defaultData;

  if (Array.isArray(defaultData)) {
    return Array.isArray(dbData) ? dbData : defaultData;
  }

  const merged = { ...defaultData, ...dbData };
  for (const k of Object.keys(defaultData)) {
    if (Array.isArray(defaultData[k])) {
      merged[k] = Array.isArray(dbData[k]) ? dbData[k] : defaultData[k];
    }
  }
  return merged;
}

// Fetch all vertical_content rows for one page and merge each against its default.
// Fails gracefully (returns defaults untouched) if supabase is null, the table doesn't
// exist yet, or the request otherwise errors.
export async function fetchVerticalContent(supabase, page, defaults, sections) {
  const merged = {};
  for (const key of sections) merged[key] = defaults[key];

  if (!supabase) return merged;

  try {
    const { data, error } = await supabase.from('vertical_content').select('*').eq('page', page);
    if (error || !data) return merged;
    for (const row of data) {
      if (row?.section && defaults[row.section] !== undefined) {
        merged[row.section] = mergeSectionData(defaults[row.section], row.data);
      }
    }
  } catch {
    // supabase not reachable / table missing — silently fall back to defaults
  }

  return merged;
}
