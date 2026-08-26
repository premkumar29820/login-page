import { useNavigate } from 'react-router-dom';

function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-netflixBlack text-white">
      <header className="flex items-center justify-between px-6 py-4 md:px-12">
        <h1 className="text-netflixRed text-2xl font-extrabold tracking-tight">CLONEFLIX</h1>
        <button
          onClick={handleLogout}
          className="rounded border border-gray-500 px-4 py-2 text-sm hover:bg-white/10"
        >
          Sign Out
        </button>
      </header>

      <main className="px-6 py-16 text-center md:px-12">
        <h2 className="mb-3 text-3xl font-bold md:text-4xl">
          Welcome, {user?.name || user?.email}!
        </h2>
        <p className="text-gray-400">You're logged in. This is a placeholder dashboard page.</p>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex aspect-video items-center justify-center rounded bg-[#222] text-gray-600"
            >
              Title {i + 1}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
