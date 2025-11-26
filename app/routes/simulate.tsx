export default function SimulateProject() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] p-8">
      <div className="max-w-3xl w-full text-center">
        <div className="mb-8 animate-bounce">
          <svg
            className="w-24 h-24 mx-auto text-[var(--color-primary)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-[fadeIn_1s_ease-in]">
          Em Construção
        </h1>

        <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-8 animate-[fadeIn_1.5s_ease-in]">
          Estamos preparando algo incrível para você!
        </p>

        <p className="text-lg text-[var(--color-text-secondary)] mb-12 animate-[fadeIn_2s_ease-in]">
          Esta página está sendo desenvolvida e estará disponível em breve.
        </p>

        <button
          onClick={() => window.history.back()}
          className="px-10 py-4 bg-[var(--color-primary)] text-[var(--color-button-text)] rounded-full font-semibold text-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer duration-300 animate-[fadeIn_2.5s_ease-in]"
        >
          Voltar para Home
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
