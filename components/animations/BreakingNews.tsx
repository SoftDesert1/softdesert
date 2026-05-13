export function BreakingNews() {
  return (
    <div className="w-full overflow-hidden border border-red-900 bg-red-950/40 rounded-xl">

      <div className="flex">

        <div className="bg-red-600 px-4 py-3 font-bold text-white whitespace-nowrap">
          🔥 BREAKING NEWS
        </div>

        <div className="relative flex-1 overflow-hidden">

          <div className="animate-marquee whitespace-nowrap py-3 px-6 text-gray-300">

            Novo patch chegou ao Black Desert • 
            Nova classe anunciada • 
            Evento mundial ativo • 
            Boss Rush liberado •

          </div>

        </div>

      </div>

    </div>
  );
}