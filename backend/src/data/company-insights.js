// Static company insight dataset. Extend as needed.
const COMPANY_INSIGHTS = [
  {
    name: "Hyperpure",
    slug: "hyperpure",
    rating: "3.6/5",
    reputation:
      "Considered a fast-growing B2B supplies business under the Zomato umbrella, with solid brand backing.",
    culture:
      "Fast-paced, operations-heavy environment with a strong focus on execution and delivery reliability.",
    growth:
      "Good ownership and learning opportunities, especially for people comfortable with supply-chain and on-ground operations.",
    compensation:
      "Generally competitive for supply-chain and operations roles in its segment; senior roles can be significantly higher than market average.",
    caveats: [
      "Work-life balance can be challenging due to operational pressures and peak-period workloads.",
      "Roles can be demanding and may involve on-ground/shift work depending on function.",
    ],
  },
];

/**
 * Look up a static company insight by name or slug.
 * @param {string} query
 * @returns {object|null}
 */
function getCompanyInsight(query) {
  const lower = query.toLowerCase().trim();

  const direct = COMPANY_INSIGHTS.find(
    (c) => c.slug === lower || c.name.toLowerCase() === lower
  );
  if (direct) return direct;

  const fuzzy = COMPANY_INSIGHTS.find(
    (c) => lower.includes(c.slug) || lower.includes(c.name.toLowerCase())
  );
  return fuzzy ?? null;
}

module.exports = { getCompanyInsight };
