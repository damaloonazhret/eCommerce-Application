export default function createNavLink(
    href: string,
    className: string,
    text: string,
    dataRoute = true
): HTMLAnchorElement {
    const link = document.createElement('a');
    link.className = className;
    link.href = href;
    link.textContent = text;

    if (dataRoute) {
        link.setAttribute('data-route', '');
    }

    return link;
}
