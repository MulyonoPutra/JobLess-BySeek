export interface MenuItem {
    label: string;
    route: string;
    function?: () => void;
}

export interface Menu {
    header: MenuItem[];
    profile: MenuItem[];
}
