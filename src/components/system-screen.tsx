import Link from "next/link";
import {
  formatArea,
  screenCatalog,
  type ScreenDefinition,
} from "@/lib/screen-catalog";

const areaTheme: Record<
  ScreenDefinition["area"],
  { accent: string; chip: string; panel: string }
> = {
  public: {
    accent: "from-amber-300 to-orange-400",
    chip: "bg-amber-100 text-amber-900 border-amber-300",
    panel: "bg-amber-50/60 border-amber-200",
  },
  partner: {
    accent: "from-sky-300 to-cyan-400",
    chip: "bg-sky-100 text-sky-900 border-sky-300",
    panel: "bg-cyan-50/60 border-cyan-200",
  },
  chef: {
    accent: "from-emerald-300 to-lime-400",
    chip: "bg-emerald-100 text-emerald-900 border-emerald-300",
    panel: "bg-emerald-50/60 border-emerald-200",
  },
  admin: {
    accent: "from-rose-300 to-red-400",
    chip: "bg-rose-100 text-rose-900 border-rose-300",
    panel: "bg-rose-50/60 border-rose-200",
  },
};

const sampleRestaurants = [
  "Al Safa Club",
  "Desert Fig Atelier",
  "Marina Ember House",
  "Jumeirah Salt Oven",
];

const sampleChefs = ["Amina Haddad", "Yousef Al Najjar", "Clara Voss"];

const sampleMetrics = [
  { label: "Weekly reservations", value: "2,184" },
  { label: "Conversion rate", value: "16.2%" },
  { label: "Average rating", value: "4.7" },
  { label: "No-show risk", value: "4.1%" },
];

function QuickLinks({
  current,
  screens,
}: {
  current: ScreenDefinition;
  screens: ScreenDefinition[];
}) {
  return (
    <div className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-zinc-500">
        This module
      </p>
      <p className="mt-1 text-lg font-semibold text-zinc-900">{current.category}</p>
      <ul className="mt-4 space-y-2">
        {screens.map((screen) => (
          <li key={screen.id}>
            <Link
              href={screen.path}
              className={`block rounded-xl border px-3 py-2 text-sm transition hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-white ${
                screen.id === current.id
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-200 bg-zinc-50 text-zinc-800"
              }`}
            >
              {screen.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PreviewCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-zinc-900">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-zinc-600">{body}</p>
    </article>
  );
}

function DiscoveryPreview() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <PreviewCard
        title="Popular right now"
        body="Data driven ranking surfaces the most booked venues in the last 72 hours."
      />
      <PreviewCard
        title="Curated neighborhoods"
        body="Collections grouped by Downtown, Marina, Palm Jumeirah, and DIFC."
      />
      <PreviewCard
        title="Smart sort"
        body="Users can rank by rating, distance, budget fit, and chef reputation."
      />
      <PreviewCard
        title="Quick reserve"
        body="Each card includes a direct booking action with live availability hints."
      />
    </div>
  );
}

function SearchSuggestionPreview() {
  const suggestions = [
    "Sushi in Downtown",
    "Rooftop dinner Marina",
    "Chef's table tasting",
    "Budget lunch under AED 150",
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-zinc-300 bg-white p-4">
        <label className="text-sm font-semibold text-zinc-700">Search restaurants</label>
        <input
          readOnly
          value="sushi"
          className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-800"
          aria-label="Search"
        />
        <div className="mt-3 rounded-xl border border-zinc-200 bg-zinc-50 p-2">
          <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Suggestions
          </p>
          <ul className="space-y-1">
            {suggestions.map((item) => (
              <li key={item} className="rounded-lg bg-white px-3 py-2 text-sm text-zinc-700">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <PreviewCard
        title="Behavior"
        body="Dropdown suggestions blend trending queries, recent history, and nearby contexts."
      />
    </div>
  );
}

function FilterPanelPreview() {
  const filters = ["Cuisine", "Budget", "Rating", "Outdoor seating", "Family friendly"];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold text-zinc-900">Sidebar filter state</p>
        <div className="mt-3 space-y-2">
          {filters.map((filter) => (
            <label
              key={filter}
              className="flex items-center justify-between rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-700"
            >
              <span>{filter}</span>
              <input type="checkbox" readOnly checked={filter === "Cuisine" || filter === "Rating"} />
            </label>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-zinc-200 bg-zinc-900 p-4 text-zinc-100 shadow-sm">
        <p className="text-sm font-semibold">Modal filter summary</p>
        <p className="mt-2 text-sm text-zinc-300">Selected: Japanese, AED 100-250, 4.5+ stars.</p>
        <button className="mt-4 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-900">
          Apply 24 matches
        </button>
      </div>
    </div>
  );
}

function MapPreview() {
  const pins = [
    { name: "Al Safa Club", top: "18%", left: "24%" },
    { name: "Desert Fig Atelier", top: "46%", left: "56%" },
    { name: "Marina Ember House", top: "66%", left: "34%" },
  ];

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-zinc-900">Map density view</p>
      <div className="relative mt-3 h-72 overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-cyan-50 via-white to-orange-50">
        {pins.map((pin) => (
          <span
            key={pin.name}
            style={{ top: pin.top, left: pin.left }}
            className="absolute rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white shadow"
          >
            {pin.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function SeoTemplatePreview() {
  return (
    <div className="space-y-4">
      <PreviewCard
        title="Template anatomy"
        body="Each SEO page includes intro content, faceted chips, FAQ schema copy, and internal links."
      />
      <PreviewCard
        title="Canonical strategy"
        body="Facet combinations map to canonical anchors to prevent duplicate ranking collisions."
      />
      <PreviewCard
        title="Structured content"
        body="JSON-LD friendly sections can be expanded for local business and review snippets."
      />
    </div>
  );
}

function RestaurantExperiencePreview({ screen }: { screen: ScreenDefinition }) {
  if (screen.id === "restaurant-menu") {
    const menuItems = [
      "Seared Hammour, Citrus Broth - AED 124",
      "Saffron Risotto with Truffle - AED 138",
      "Charred Lamb Rack, Date Glaze - AED 168",
    ];

    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold text-zinc-900">Signature menu highlights</p>
        <ul className="mt-3 space-y-2">
          {menuItems.map((item) => (
            <li key={item} className="rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-700">
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (screen.id === "restaurant-reviews") {
    const reviews = [
      "Outstanding tasting sequence and very smooth service.",
      "Rooftop ambience and skyline views are unmatched.",
      "A little loud indoors but food quality is excellent.",
    ];

    return (
      <div className="space-y-3">
        {reviews.map((review) => (
          <article key={review} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-zinc-900">4.8 / 5</p>
            <p className="mt-1 text-sm text-zinc-600">{review}</p>
          </article>
        ))}
      </div>
    );
  }

  if (screen.id === "restaurant-gallery") {
    return (
      <div className="grid gap-3 md:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((card) => (
          <div
            key={card}
            className="flex h-28 items-end rounded-2xl border border-zinc-200 bg-gradient-to-br from-orange-200 via-amber-100 to-teal-100 p-3"
          >
            <span className="rounded-lg bg-white/80 px-2 py-1 text-xs font-semibold text-zinc-700">
              Asset {card}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PreviewCard
        title="Restaurant snapshots"
        body="Cards include cuisine tags, opening hours, and reservation confidence score."
      />
      <PreviewCard
        title="Guest intent actions"
        body="Reserve now, save to list, compare with nearby alternatives, and map jump."
      />
    </div>
  );
}

function ChefSystemPreview() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {sampleChefs.map((chef) => (
        <article key={chef} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-zinc-900">{chef}</p>
          <p className="mt-1 text-sm text-zinc-600">Specialty: Levantine modern tasting</p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-zinc-500">3 Linked restaurants</p>
        </article>
      ))}
    </div>
  );
}

function BookingFlowPreview({ screen }: { screen: ScreenDefinition }) {
  const statusText: Record<string, string> = {
    "booking-confirmation": "Confirmed for Friday, 20:30, 4 guests",
    "booking-error": "Payment verification timed out, please retry",
    "booking-modification": "Current slot can be moved to Saturday, 21:00",
    "booking-cancellation": "Cancellation policy: free up to 12 hours",
  };

  const isError = screen.id === "booking-error";
  const isSuccess = screen.id === "booking-confirmation";

  return (
    <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
      <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold text-zinc-900">Booking widget component</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-sm text-zinc-700">
            Date
            <input
              readOnly
              value="2026-04-25"
              className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2"
            />
          </label>
          <label className="text-sm text-zinc-700">
            Time
            <input
              readOnly
              value="20:30"
              className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2"
            />
          </label>
          <label className="text-sm text-zinc-700 sm:col-span-2">
            Guests
            <input
              readOnly
              value="4"
              className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2"
            />
          </label>
        </div>
        <button className="mt-4 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white">
          Continue reservation
        </button>
      </div>
      <div
        className={`rounded-3xl border p-5 shadow-sm ${
          isError
            ? "border-red-300 bg-red-50"
            : isSuccess
              ? "border-emerald-300 bg-emerald-50"
              : "border-zinc-200 bg-zinc-50"
        }`}
      >
        <p className="text-sm font-semibold text-zinc-900">Flow status</p>
        <p className="mt-2 text-sm text-zinc-700">
          {statusText[screen.id] ?? "Fill in reservation details and submit."}
        </p>
      </div>
    </div>
  );
}

function AccountPreview() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold text-zinc-900">Account controls</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="text-sm text-zinc-700">
            Full name
            <input readOnly value="Nadia Al Zarooni" className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2" />
          </label>
          <label className="text-sm text-zinc-700">
            Email
            <input readOnly value="nadia@example.com" className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2" />
          </label>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <PreviewCard title="Favorites" body="12 saved places and 3 themed collections." />
        <PreviewCard title="Bookings" body="5 upcoming reservations in the next 30 days." />
        <PreviewCard title="Reviews" body="18 verified reviews with 92% helpful votes." />
      </div>
    </div>
  );
}

function ContentPreview({ screen }: { screen: ScreenDefinition }) {
  if (screen.id === "blog-article") {
    return (
      <article className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">Feature Story</p>
        <h2 className="mt-2 text-2xl font-semibold text-zinc-900">The Rise of Desert Farm-to-Table in Dubai</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">
          Editorial sections blend local sourcing trends, chef interviews, and new dining rituals shaped by seasonal produce.
        </p>
      </article>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <PreviewCard
        title="Editorial slots"
        body="Hero, featured, trending, and evergreen article placements supported."
      />
      <PreviewCard
        title="SEO controls"
        body="Meta data blocks, canonical links, and related article modules included."
      />
    </div>
  );
}

function StaticPreview({ screen }: { screen: ScreenDefinition }) {
  return (
    <article className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-zinc-900">{screen.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600">
        This static content template includes sections for hero text, detail blocks, and legal or policy copy where needed.
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        <li className="rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-700">Clear heading hierarchy</li>
        <li className="rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-700">Reusable content blocks</li>
        <li className="rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-700">Call-to-action sections</li>
        <li className="rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-700">Accessible typography defaults</li>
      </ul>
    </article>
  );
}

function DashboardPreview({ screen }: { screen: ScreenDefinition }) {
  const operations =
    screen.area === "admin"
      ? ["Approve pending entities", "Enforce content policy", "Track platform revenue"]
      : screen.area === "partner"
        ? ["Manage listing quality", "Monitor conversion", "Run promotions"]
        : ["Update profile", "Upload media", "Track linked venues"];

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-4">
        {sampleMetrics.map((metric) => (
          <article key={metric.label} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-900">{metric.value}</p>
          </article>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-zinc-900">Operational checklist</p>
          <ul className="mt-3 space-y-2">
            {operations.map((item) => (
              <li key={item} className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-700">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-zinc-900">Live queue</p>
          <ul className="mt-3 space-y-2">
            {["Pending approvals: 12", "New tickets: 8", "Alerts: 3"].map((item) => (
              <li key={item} className="rounded-lg bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function renderPrimaryContent(screen: ScreenDefinition) {
  if (screen.id === "search-suggestions") {
    return <SearchSuggestionPreview />;
  }

  if (screen.id === "filter-panel") {
    return <FilterPanelPreview />;
  }

  if (screen.id === "map-view") {
    return <MapPreview />;
  }

  if (screen.category === "SEO Programmatic") {
    return <SeoTemplatePreview />;
  }

  if (screen.category === "Restaurant Experience") {
    return <RestaurantExperiencePreview screen={screen} />;
  }

  if (screen.category === "Chef System") {
    return <ChefSystemPreview />;
  }

  if (screen.category === "Booking System") {
    return <BookingFlowPreview screen={screen} />;
  }

  if (
    screen.category === "User Account" ||
    screen.id === "signup" ||
    screen.id === "login" ||
    screen.id === "forgot-password" ||
    screen.id === "partner-login" ||
    screen.id === "partner-registration" ||
    screen.id === "chef-login"
  ) {
    return <AccountPreview />;
  }

  if (screen.category === "Content & SEO") {
    return <ContentPreview screen={screen} />;
  }

  if (screen.category === "Static Pages") {
    return <StaticPreview screen={screen} />;
  }

  if (screen.area === "partner" || screen.area === "chef" || screen.area === "admin") {
    return <DashboardPreview screen={screen} />;
  }

  return <DiscoveryPreview />;
}

export function SystemScreenPage({ screen }: { screen: ScreenDefinition }) {
  const theme = areaTheme[screen.area];
  const categoryScreens = screenCatalog.filter((entry) => entry.category === screen.category);
  const areaScreens = screenCatalog.filter((entry) => entry.area === screen.area).slice(0, 12);

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(255,230,180,0.45),transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(180,225,255,0.35),transparent_45%)]" />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header
          className={`rounded-3xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur-sm sm:p-8 ${theme.panel}`}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${theme.chip}`}>
              {formatArea(screen.area)}
            </span>
            <span className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-semibold text-zinc-700">
              {screen.category}
            </span>
            <span className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-semibold text-zinc-700">
              {screenCatalog.length} screens scaffolded
            </span>
          </div>
          <h1 data-testid="screen-title" className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            {screen.title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-700 sm:text-base">{screen.summary}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <code
              data-testid="screen-path"
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-xs text-zinc-700"
            >
              {screen.path}
            </code>
            <div className="flex flex-wrap gap-2">
              {screen.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-white">
            <div className={`h-full w-1/2 rounded-full bg-gradient-to-r ${theme.accent}`} />
          </div>
        </header>

        <main className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          <section className="space-y-4 rounded-3xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur-sm sm:p-6">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-zinc-500">Screen build</p>
            {renderPrimaryContent(screen)}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-sm font-semibold text-zinc-900">Linked samples</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {sampleRestaurants.map((item) => (
                  <li key={item} className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <aside className="space-y-4">
            <QuickLinks current={screen} screens={categoryScreens} />
            <QuickLinks current={screen} screens={areaScreens} />
          </aside>
        </main>
      </div>
    </div>
  );
}
