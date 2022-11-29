import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Nunito Sans', sans-serif;
    }

    :root{
        --r: 108;
        --g: 99;
        --b: 255;
        --a: 1;

        --brand: rgba(var(--r),var(--g),var(--b),var(--a));
        --brand-hover: rgba(var(--r),65,var(--b),var(--a))
    }

    body, .offcanvas-lg{
        background-color: #2F2E41;
    }

    .bg-brand{
        background-color: var(--brand);
        border-color: transparent;
    }

    .bg-brand:disabled{
        background-color: var(--brand);
        border-color: transparent;
    }

    .bg-brand:hover{
        background-color: var(--brand-hover);
    }

    .bg-brand:active{
        background-color: var(--brand-hover) !important;
    }

    .bg-brand:focus{
        background-color: var(--brand-hover) !important;
    }

    .text-brand{
        color: var(--brand)
    }

    .text-brand:hover{
        color: var(--brand)
    }

    .text-brand:active{
        color: var(--brand) !important
    }

    .border-brand{
        border-color: var(--brand) !important
    }

    .border-brand:focus{
        border-color: var(--brand) !important
    }

    .object-fit-contain{
        object-fit: contain;
    }
`;
