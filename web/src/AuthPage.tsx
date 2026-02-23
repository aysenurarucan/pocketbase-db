import { useState } from "react";
import { pb } from "./pb";

export default function AuthPage({ onAuthed }: { onAuthed: () => void }) {
    const [mode, setMode] = useState<"login" | "register">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            if (mode === "register") {
                await pb.collection("users").create({
                    email,
                    password,
                    passwordConfirm: password,
                });

                // ✅ kayıt sonrası: otomatik login YOK
                setMode("login");
                setError("Kayıt başarılı. Şimdi giriş yap.");
                return;
            }

            // ✅ sadece login modunda giriş yap
            await pb.collection("users").authWithPassword(email, password);
            onAuthed();
        } catch (e: any) {
            setError(e?.data?.message ?? e?.message ?? "Auth failed");
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white p-6">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold">UIMastery Pro</h1>
                    <button
                        className="text-sm text-white/70 hover:text-white"
                        onClick={() => setMode(mode === "login" ? "register" : "login")}
                        type="button"
                    >
                        {mode === "login" ? "Kayıt Ol" : "Giriş Yap"}
                    </button>
                </div>

                <p className="text-sm text-white/70 mb-6">
                    {mode === "login" ? "Hesabınla giriş yap." : "Yeni hesap oluştur."}
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        className="w-full rounded-xl bg-zinc-900/60 border border-white/10 px-4 py-3 outline-none focus:border-purple-400"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                    />
                    <input
                        className="w-full rounded-xl bg-zinc-900/60 border border-white/10 px-4 py-3 outline-none focus:border-purple-400"
                        placeholder="Şifre (min 8 karakter)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        minLength={8}
                        required
                    />

                    {error && (
                        <div className="text-sm text-red-300 border border-red-500/30 bg-red-500/10 rounded-xl p-3">
                            {error}
                        </div>
                    )}

                    <button
                        className="w-full rounded-xl bg-purple-600 hover:bg-purple-500 transition px-4 py-3 font-medium disabled:opacity-60"
                        disabled={loading}
                        type="submit"
                    >
                        {loading ? "Bekle..." : mode === "login" ? "Giriş Yap" : "Kayıt Ol"}
                    </button>
                </form>
            </div>
        </div>
    );
}
