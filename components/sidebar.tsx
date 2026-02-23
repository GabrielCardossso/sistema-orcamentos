'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    const linkBase =
        "block px-4 py-3 rounded-xl transition";

    const linkInactive =
        "hover:bg-[#2A2D34] hover:text-purple-400";

    const linkActive =
        "bg-[#2A2D34] text-purple-400";

    return (
        <aside className="
      w-64
      bg-[#1E1F24]
      border-r border-[#343741]
      shadow-[10px_0_40px_rgba(42,45,52,0.4)]
      p-6
      flex-shrink-0
    ">
            <nav className="space-y-3">

                <Link
                    href="/produtos"
                    className={`${linkBase} ${pathname.startsWith("/produtos")
                            ? linkActive
                            : linkInactive
                        }`}
                >
                    Produtos
                </Link>

                <Link
                    href="/orcamentos"
                    className={`${linkBase} ${pathname.startsWith("/orcamentos")
                            ? linkActive
                            : linkInactive
                        }`}
                >
                    Orçamentos
                </Link>

                <Link
                    href="/pedidos"
                    className={`${linkBase} ${pathname.startsWith("/pedidos")
                            ? linkActive
                            : linkInactive
                        }`}
                >
                    Pedidos
                </Link>

            </nav>
        </aside>
    );
}