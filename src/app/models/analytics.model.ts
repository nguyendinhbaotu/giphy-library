export interface Analytics {
    onload: Onload
    onclick: Onclick
    onsent: Onsent
}

export interface Onload {
    url: string
}

export interface Onclick {
    url: string
}

export interface Onsent {
    url: string
}