export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="font-newsreader text-3xl font-semibold text-[#101828]">Settings</h1>
        <p className="text-sm text-[#5B6475] mt-1">Configure your AI Blog Writer preferences.</p>
      </div>

      <div className="bg-white border border-[#E3E6EC] rounded-2xl divide-y divide-[#E3E6EC]">
        <div className="p-6 flex items-start justify-between gap-4">
          <div>
            <p className="font-semibold text-[#101828] text-sm">API Endpoint</p>
            <p className="text-xs text-[#5B6475] mt-1">
              Backend URL configured via <code className="font-mono text-[#2F4BD0]">NEXT_PUBLIC_API_URL</code>
            </p>
          </div>
          <code className="text-xs font-mono bg-[#F3F5F8] text-[#344054] px-3 py-1.5 rounded-lg border border-[#E3E6EC]">
            {process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000"}
          </code>
        </div>

        <div className="p-6 flex items-start justify-between gap-4">
          <div>
            <p className="font-semibold text-[#101828] text-sm">Workflow</p>
            <p className="text-xs text-[#5B6475] mt-1">LangGraph state machine with 2 nodes</p>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span className="text-xs font-mono bg-[#EEF1FD] text-[#2F4BD0] px-2 py-1 rounded">outline_node</span>
            <span className="text-xs font-mono bg-[#EEF1FD] text-[#2F4BD0] px-2 py-1 rounded">content_node</span>
          </div>
        </div>

        <div className="p-6 flex items-start justify-between gap-4">
          <div>
            <p className="font-semibold text-[#101828] text-sm">History limit</p>
            <p className="text-xs text-[#5B6475] mt-1">Maximum blogs stored in localStorage</p>
          </div>
          <span className="text-sm font-semibold text-[#344054]">20 entries</span>
        </div>
      </div>
    </div>
  );
}
