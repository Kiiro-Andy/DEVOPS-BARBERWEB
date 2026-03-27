import { LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { supabase } from "../supabaseClient";

export default function TopBar({ onMenuClick }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "¿Cerrar sesión?",
      text: "¿Estás seguro de que quieres salir?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#C0A060",
      cancelButtonColor: "#7A1F2B",
    });

    if (result.isConfirmed) {
      try {
        console.log("🚪 Cerrando sesión...");

        // Cerrar sesión en Supabase (cierra TODAS las sesiones)
        const { error } = await supabase.auth.signOut({ scope: "global" });

        if (error) {
          console.error("❌ Error al cerrar sesión:", error);
        } else {
          console.log("✅ Sesión cerrada en Supabase");
        }

        // Limpiar TODO el almacenamiento local
        localStorage.clear();
        sessionStorage.clear();

        // Limpiar cookies de Supabase manualmente
        document.cookie.split(";").forEach(function (c) {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(
              /=.*/,
              "=;expires=" + new Date().toUTCString() + ";path=/",
            );
        });

        console.log("🗑️ Todo limpiado");

        // Forzar recarga completa para limpiar estado
        window.location.href = "/";
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    }
  };

  return (
    <header
      className="
        fixed top-0 left-0 right-0 z-50
        h-14 md:h-16
        bg-barber-white
        border-b border-barber-gray/20
        px-4 md:px-6
        flex items-center justify-between
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-2">
        {/* HAMBURGUESA */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg bg-barber-gold shadow-sm"
        >
          <Menu className="w-5 h-5 text-barber-black" />
        </button>

        <div>
          <h1 className="text-base md:text-lg font-bold text-barber-black">
            Panel Barbero
          </h1>
          <p className="text-[10px] md:text-xs text-barber-gray">
            Administrativo
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 md:gap-3">
        <span className="hidden sm:block text-sm font-medium text-barber-gray">
          Barbero
        </span>

        <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-barber-gold flex items-center justify-center font-bold">
          B
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-barber-wine hover:bg-barber-wine/10 transition text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden md:inline">Salir</span>
        </button>
      </div>
    </header>
  );
}
