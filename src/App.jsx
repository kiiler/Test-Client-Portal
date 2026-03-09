import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  BarChart3,
  ClipboardPlus,
  FileText,
  FlaskConical,
  Link2,
  Settings,
  ShieldCheck,
  Truck,
  Users,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { key: 'request', label: 'New Test Request', icon: ClipboardPlus },
  { key: 'orders', label: 'Orders', icon: Truck },
  { key: 'reports', label: 'Reports', icon: FileText },
  { key: 'compliance', label: 'Compliance Analytics', icon: ShieldCheck },
  { key: 'suppliers', label: 'Suppliers', icon: Users },
  { key: 'integrations', label: 'Integrations', icon: Link2 },
  { key: 'settings', label: 'Settings', icon: Settings },
]

const kpis = [
  ['Total tests', 1284, '+12% vs last quarter'],
  ['In progress', 214, '48 urgent samples'],
  ['Completed', 982, '94% on-time completion'],
  ['Failed / high-risk', 88, '18 pending CAPA actions'],
  ['Avg turnaround time', '6.2 days', 'Target: < 7 days'],
  ['Pending supplier actions', 37, 'Missing samples/documents'],
]

const orders = [
  ['HSE-TR-2401', 'Pearl Stitch Apparel Ltd.', 'Bangladesh', 'Jackets', 'In testing', 'Combined', 'High'],
  ['HSE-TR-2402', 'EuroLeather Works SRL', 'Italy', 'Leather bags', 'Technical review', 'Chemical', 'Medium'],
  ['HSE-TR-2403', 'Anatolia Accessories A.S.', 'Turkey', 'Belts', 'Sample in transit', 'Physical', 'Low'],
  ['HSE-TR-2404', 'Shenzhen Smart Footwear Co.', 'China', 'Sneakers', 'Report issued', 'Combined', 'High'],
  ['HSE-TR-2405', 'Bavaria Pack Solutions GmbH', 'Germany', 'Cartons', 'Received', 'Physical', 'Medium'],
]

const reports = [
  ['RPT-93831', 'Men\'s Softshell Jacket', 'Pearl Stitch Apparel Ltd.', 'Bangladesh', 'Jackets', 'Combined', '2026-01-18', 'Pass'],
  ['RPT-93824', 'Women\'s Leather Tote', 'EuroLeather Works SRL', 'Italy', 'Leather bags', 'Chemical', '2026-01-16', 'Fail'],
  ['RPT-93819', 'Running Sneaker Model F8', 'Shenzhen Smart Footwear Co.', 'China', 'Sneakers', 'Physical', '2026-01-15', 'Under Review'],
  ['RPT-93811', 'Retail Polybag 45μ', 'Delta Pack Vietnam', 'Vietnam', 'Polybags', 'Chemical', '2026-01-12', 'At Risk'],
]

const dashboardCharts = {
  country: [
    { name: 'China', value: 322 },
    { name: 'India', value: 206 },
    { name: 'Bangladesh', value: 189 },
    { name: 'Vietnam', value: 174 },
    { name: 'Turkey', value: 143 },
    { name: 'Italy', value: 127 },
    { name: 'Germany', value: 123 },
  ],
  product: [
    { name: 'Jackets', tests: 214 },
    { name: 'Trousers', tests: 175 },
    { name: 'Sneakers', tests: 163 },
    { name: 'Leather bags', tests: 140 },
    { name: 'Belts', tests: 122 },
    { name: 'Polybags', tests: 98 },
    { name: 'Cartons', tests: 92 },
  ],
  passFail: [
    { name: 'Pass', value: 78 },
    { name: 'Fail', value: 11 },
    { name: 'Under Review', value: 7 },
    { name: 'At Risk', value: 4 },
  ],
}

const trendData = [
  { month: 'Aug', pass: 124, fail: 22 },
  { month: 'Sep', pass: 133, fail: 18 },
  { month: 'Oct', pass: 129, fail: 21 },
  { month: 'Nov', pass: 146, fail: 19 },
  { month: 'Dec', pass: 152, fail: 14 },
  { month: 'Jan', pass: 158, fail: 16 },
]

const failureBySupplier = [
  { supplier: 'Pearl Stitch', fails: 7 },
  { supplier: 'Shenzhen Footwear', fails: 6 },
  { supplier: 'Delta Pack Vietnam', fails: 5 },
  { supplier: 'Anatolia Accessories', fails: 4 },
]

const supplierPerf = [
  ['Pearl Stitch Apparel Ltd.', 184, '5.4%', '6.1 days', 2, 'Azo dyes in trims'],
  ['EuroLeather Works SRL', 162, '3.1%', '5.8 days', 1, 'Chromium VI alert'],
  ['Shenzhen Smart Footwear Co.', 228, '6.0%', '6.9 days', 3, 'Phthalates in soles'],
  ['Delta Pack Vietnam', 119, '7.5%', '7.2 days', 4, 'Heavy metals in print ink'],
]

const colors = ['#155e75', '#0f766e', '#64748b', '#f59e0b', '#ef4444']

const statusColor = {
  Pass: 'text-emerald-700 bg-emerald-50',
  Fail: 'text-rose-700 bg-rose-50',
  'Under Review': 'text-amber-700 bg-amber-50',
  'At Risk': 'text-orange-700 bg-orange-50',
}

const roleViews = ['HSE Quality / Compliance Manager', 'Supplier / Factory User', 'HQTS Lab Coordinator', 'HQTS Technical Reviewer']

function Card({ title, children }) {
  return (
    <section className="rounded-xl bg-white p-5 shadow-card">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h3>
      {children}
    </section>
  )
}

export default function App() {
  const [active, setActive] = useState('dashboard')
  const [role, setRole] = useState(roleViews[0])
  const [selectedReport, setSelectedReport] = useState(reports[0])

  const pageTitle = useMemo(() => navItems.find((n) => n.key === active)?.label ?? 'Dashboard', [active])

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="w-72 border-r border-slate-200 bg-white p-6">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-lg bg-brand-700 p-2 text-white">
            <FlaskConical className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500">HQTS</p>
            <h1 className="text-lg font-bold text-slate-800">TestFlow Portal</h1>
          </div>
        </div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Proposal Demo for HSE</p>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.key}
                onClick={() => setActive(item.key)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
                  active === item.key ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            )
          })}
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{pageTitle}</h2>
            <p className="text-sm text-slate-500">Framework-ready laboratory workflow for Home Shopping Europe GmbH</p>
          </div>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          >
            {roleViews.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </header>

        {active === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {kpis.map(([label, value, note]) => (
                <Card key={label} title={label}>
                  <p className="text-2xl font-semibold text-slate-900">{value}</p>
                  <p className="mt-1 text-sm text-slate-500">{note}</p>
                </Card>
              ))}
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <Card title="Tests by country">
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={dashboardCharts.country}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#155e75" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
              <Card title="Pass / fail ratio">
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie data={dashboardCharts.passFail} dataKey="value" nameKey="name" outerRadius={80}>
                      {dashboardCharts.passFail.map((_, i) => (
                        <Cell key={i} fill={colors[i]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
              <Card title="Tests by product group">
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={dashboardCharts.product}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="tests" fill="#0f766e" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
              <Card title="Recent compliance alerts">
                <ul className="space-y-3 text-sm">
                  {['Chromium VI above threshold in leather strap batch IT-33', 'Phthalates detected in outsole compound CN-21', 'Formaldehyde variance in stitched trim BD-89'].map((a) => (
                    <li key={a} className="flex items-start gap-2 rounded-lg bg-rose-50 p-3 text-rose-800">
                      <AlertTriangle className="mt-0.5 h-4 w-4" /> {a}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        )}

        {active === 'request' && (
          <Card title="Supplier self-booking | standardized test intake">
            <div className="grid gap-4 md:grid-cols-2">
              {['Supplier Name', 'Production Country', 'Product Group', 'Product Description', 'Season / PO / Ref. Number', 'Requested Test Scope', 'Test Type (Chemical / Physical / Combined)', 'Urgency Level'].map((field) => (
                <label key={field} className="text-sm text-slate-700">
                  {field}
                  <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" placeholder={`Enter ${field.toLowerCase()}`} />
                </label>
              ))}
              <label className="text-sm text-slate-700 md:col-span-2">
                Upload Supporting Files
                <input type="file" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2" />
              </label>
              <label className="text-sm text-slate-700 md:col-span-2">
                Remarks
                <textarea className="mt-1 h-24 w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="Additional testing notes" />
              </label>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
              <span>Automated checks: mandatory fields, scope templates, supplier profile autofill, email notifications.</span>
              <button className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white">Submit Request</button>
            </div>
          </Card>
        )}

        {active === 'orders' && (
          <Card title="End-to-end test order tracking">
            <div className="mb-4 grid gap-3 md:grid-cols-5">
              {['Country', 'Supplier', 'Product Group', 'Status', 'Date Range'].map((f) => (
                <input key={f} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder={`Filter by ${f}`} />
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>{['Order', 'Supplier', 'Country', 'Product', 'Status', 'Scope', 'Urgency'].map((h) => <th key={h} className="p-3 font-medium">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o[0]} className="border-b border-slate-100">
                      {o.map((v, i) => (
                        <td key={i} className="p-3">{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {active === 'reports' && (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card title="Digital report repository">
                <input className="mb-4 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Search by report #, supplier, product, country..." />
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500">
                      <tr>{['Report #', 'Product', 'Supplier', 'Country', 'Group', 'Type', 'Issue Date', 'Result'].map((h) => <th key={h} className="p-2 font-medium">{h}</th>)}</tr>
                    </thead>
                    <tbody>
                      {reports.map((r) => (
                        <tr key={r[0]} onClick={() => setSelectedReport(r)} className="cursor-pointer border-b border-slate-100 hover:bg-slate-50">
                          {r.map((c, i) => (
                            <td key={i} className="p-2">{i === 7 ? <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusColor[c]}`}>{c}</span> : c}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
            <Card title="Report preview">
              <div className="space-y-3 text-sm text-slate-700">
                <div className="aspect-video rounded-lg bg-slate-200 p-2 text-xs text-slate-500">Specimen photo placeholder</div>
                <p><b>{selectedReport[0]}</b> | {selectedReport[1]}</p>
                <p><b>English Summary:</b> Sample tested against HSE RSL v2026 and physical matrix. No critical deviation observed except listed findings.</p>
                <p><b>Compliance conclusion:</b> {selectedReport[7]}</p>
                <p><b>Marketability / RSL assessment:</b> EU marketability review completed with actionable lab comments.</p>
                <p><b>Tested components:</b> Main fabric, print, zipper puller, outsole rubber, packaging ink.</p>
                <button className="w-full rounded-lg bg-slate-900 px-3 py-2 text-white">Download PDF Report</button>
              </div>
            </Card>
          </div>
        )}

        {active === 'compliance' && (
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card title="Pass/fail trend over time">
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pass" stroke="#0f766e" strokeWidth={2} />
                    <Line type="monotone" dataKey="fail" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
              <Card title="Failures by supplier">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={failureBySupplier}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="supplier" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="fails" fill="#ef4444" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
            <Card title="Risk matrix & recurring non-compliance issues">
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ['Heavy metals', 'High', 'China / Vietnam packaging suppliers'],
                  ['Azo dyes', 'Medium', 'Bangladesh apparel trims'],
                  ['Phthalates', 'High', 'Footwear outsole compounds'],
                  ['Formaldehyde', 'Medium', 'Textile finishing processes'],
                  ['pH imbalance', 'Low', 'Dyed fabric lots'],
                  ['Chromium VI', 'High', 'Leather goods lines'],
                ].map(([issue, risk, area]) => (
                  <div key={issue} className="rounded-lg border border-slate-200 p-4">
                    <p className="font-semibold text-slate-800">{issue}</p>
                    <p className={`my-1 inline-block rounded-full px-2 py-0.5 text-xs ${risk === 'High' ? 'bg-rose-100 text-rose-700' : risk === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{risk} Risk</p>
                    <p className="text-xs text-slate-500">{area}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {active === 'suppliers' && (
          <Card title="Supplier performance management">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>{['Supplier', 'Total Tests', 'Fail Rate', 'Avg TAT', 'Open CAPA', 'Recent Issue'].map((h) => <th key={h} className="p-3 font-medium">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {supplierPerf.map((row) => (
                    <tr key={row[0]} className="border-b border-slate-100">
                      {row.map((cell, i) => <td key={i} className="p-3">{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {active === 'integrations' && (
          <div className="grid gap-6 lg:grid-cols-2">
            <Card title="API integration capabilities">
              <ul className="space-y-3 text-sm text-slate-700">
                {['API-based test request import from HSE PLM/ERP', 'Bi-directional status sync (submitted to closed)', 'Report metadata + compliance result sync', 'Bulk export: CSV, PDF, JSON endpoints', 'Webhook alerts for failed/high-risk reports'].map((item) => (
                  <li key={item} className="rounded-lg bg-slate-50 p-3">{item}</li>
                ))}
              </ul>
            </Card>
            <Card title="Phased rollout approach">
              <ol className="space-y-3 text-sm text-slate-700">
                {['Phase 1 (4 weeks): Pilot with top 10 suppliers and manual/API hybrid intake.', 'Phase 2 (8 weeks): Full supplier onboarding and role-based dashboard enablement.', 'Phase 3 (12 weeks): Automated reporting, alerting, CAPA tracking, governance reviews.'].map((p, i) => (
                  <li key={p} className="rounded-lg border border-slate-200 p-3"><b>Step {i + 1}:</b> {p}</li>
                ))}
              </ol>
            </Card>
          </div>
        )}

        {active === 'settings' && (
          <Card title="Program settings">
            <p className="text-sm text-slate-600">Configure RSL version, report templates, user roles, supplier onboarding policies, and SLA targets for long-term framework management.</p>
          </Card>
        )}
      </main>
    </div>
  )
}
