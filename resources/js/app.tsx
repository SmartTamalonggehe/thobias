import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import LayoutPage from "./layout";

const appName = import.meta.env.VITE_APP_NAME || "WWF";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ).then((module) => {
            const Page = (module as any).default;
            // Tentukan layout berdasarkan nama halaman
            Page.layout =
                Page.layout ||
                ((page: any) => {
                    return <LayoutPage>{page}</LayoutPage>;
                });
            return Page;
        }),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});
