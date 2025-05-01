import React from 'react'
import { View, Text, Image, Link } from '@react-pdf/renderer'

// Common props for all mapped components
type CommonProps = {
    pdfRender?: boolean
    children?: React.ReactNode
    [key: string]: any
}

// Utility to recursively clone and inject pdfRender prop into all children
function injectPdfRender(children: React.ReactNode, pdfRender: boolean): React.ReactNode {
    return React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;
        // Don't inject pdfRender into React.Fragment
        if (child.type === React.Fragment) {
            return <React.Fragment key={child.key}>{injectPdfRender((child.props as { children?: React.ReactNode }).children, pdfRender)}</React.Fragment>;
        }
        const props: any = { ...(child.props || {}), pdfRender };
        // Also inject into children if they exist
        if (child.props && (child.props as any).children) {
            props.children = injectPdfRender((child.props as any).children, pdfRender);
        }
        return React.cloneElement(child, props);
    });
}

/**
 * PDFSafeRender component
 * Wraps children and automatically injects pdfRender prop to all children
 * This eliminates the need to manually pass pdfRender to each component
 */
export const PDFSafeRender = ({ children, pdfRender = false }: { children: React.ReactNode, pdfRender?: boolean }) => {
    return <>{injectPdfRender(children, pdfRender)}</>;
};

/**
 * HTML/PDF component mapping.
 * Each export is a component that renders either a web or PDF element,
 * depending on the `pdfRender` prop.
 */

// Block-level elements
export const Div = ({ pdfRender, ...props }: CommonProps) =>
    pdfRender ? <View {...props} /> : <div {...props} />

export const Section = ({ pdfRender, ...props }: CommonProps) =>
    pdfRender ? <View {...props} /> : <section {...props} />

export const Article = ({ pdfRender, ...props }: CommonProps) =>
    pdfRender ? <View {...props} /> : <article {...props} />

export const Header = ({ pdfRender, ...props }: CommonProps) =>
    pdfRender ? <View {...props} /> : <header {...props} />

export const Footer = ({ pdfRender, ...props }: CommonProps) =>
    pdfRender ? <View {...props} /> : <footer {...props} />

export const Aside = ({ pdfRender, ...props }: CommonProps) =>
    pdfRender ? <View {...props} /> : <aside {...props} />

export const Main = ({ pdfRender, ...props }: CommonProps) =>
    pdfRender ? <View {...props} /> : <main {...props} />

export const Nav = ({ pdfRender, ...props }: CommonProps) =>
    pdfRender ? <View {...props} /> : <nav {...props} />

// Headings
export const H1 = ({ pdfRender, children, ...props }: CommonProps) =>
    pdfRender ? <Text style={{ fontSize: 32, fontWeight: 'bold' }} {...props}>{children}</Text> : <h1 {...props}>{children}</h1>

export const H2 = ({ pdfRender, children, ...props }: CommonProps) =>
    pdfRender ? <Text style={{ fontSize: 28, fontWeight: 'bold' }} {...props}>{children}</Text> : <h2 {...props}>{children}</h2>

export const H3 = ({ pdfRender, children, ...props }: CommonProps) =>
    pdfRender ? <Text style={{ fontSize: 24, fontWeight: 'bold' }} {...props}>{children}</Text> : <h3 {...props}>{children}</h3>

export const H4 = ({ pdfRender, children, ...props }: CommonProps) =>
    pdfRender ? <Text style={{ fontSize: 20, fontWeight: 'bold' }} {...props}>{children}</Text> : <h4 {...props}>{children}</h4>

export const H5 = ({ pdfRender, children, ...props }: CommonProps) =>
    pdfRender ? <Text style={{ fontSize: 16, fontWeight: 'bold' }} {...props}>{children}</Text> : <h5 {...props}>{children}</h5>

export const H6 = ({ pdfRender, children, ...props }: CommonProps) =>
    pdfRender ? <Text style={{ fontSize: 14, fontWeight: 'bold' }} {...props}>{children}</Text> : <h6 {...props}>{children}</h6>

// Inline elements
export const Span = ({ pdfRender, ...props }: CommonProps) =>
    pdfRender ? <Text {...props} /> : <span {...props} />

export const Strong = ({ pdfRender, children, ...props }: CommonProps) =>
    pdfRender ? <Text style={{ fontWeight: 'bold' }} {...props}>{children}</Text> : <strong {...props}>{children}</strong>

export const Em = ({ pdfRender, children, ...props }: CommonProps) =>
    pdfRender ? <Text style={{ fontStyle: 'italic' }} {...props}>{children}</Text> : <em {...props}>{children}</em>

// Paragraph
export const P = ({ pdfRender, children, ...props }: CommonProps) =>
    pdfRender ? <Text style={{ fontSize: 14, marginBottom: 8 }} {...props}>{children}</Text> : <p {...props}>{children}</p>

// Lists
export const Ul = ({ pdfRender, ...props }: CommonProps) =>
    pdfRender ? <View {...props} /> : <ul {...props} />

export const Ol = ({ pdfRender, ...props }: CommonProps) =>
    pdfRender ? <View {...props} /> : <ol {...props} />

export const Li = ({ pdfRender, children, ...props }: CommonProps) =>
    pdfRender ? <Text style={{ marginLeft: 12 }} {...props}>{children}</Text> : <li {...props}>{children}</li>

// Images and links
export const Img = ({ pdfRender, src, source, ...props }: { pdfRender?: boolean; src?: string; source?: string; [key: string]: any }) =>
    pdfRender
        ? <Image source={source || src} src={src || source} {...props} />
        : <img src={src || source} {...props} />

export const A = ({ pdfRender, children, ...props }: CommonProps) =>
    pdfRender ? <Link {...props}>{children}</Link> : <a {...props}>{children}</a>

// Miscellaneous
export const Br = ({ pdfRender, ...props }: CommonProps) =>
    pdfRender ? <Text {...props}>{'\n'}</Text> : <br {...props} />

export const Hr = ({ pdfRender, ...props }: CommonProps) =>
    pdfRender ? <View style={{ borderBottomWidth: 1, marginVertical: 8 }} {...props} /> : <hr {...props} />

// Tables
export const Table = ({ pdfRender, ...props }: CommonProps) =>
    pdfRender ? <View {...props} /> : <table {...props} />

export const Tbody = ({ pdfRender, ...props }: CommonProps) =>
    pdfRender ? <View {...props} /> : <tbody {...props} />

export const Thead = ({ pdfRender, ...props }: CommonProps) =>
    pdfRender ? <View {...props} /> : <thead {...props} />

export const Tr = ({ pdfRender, ...props }: CommonProps) =>
    pdfRender ? <View {...props} /> : <tr {...props} />

export const Td = ({ pdfRender, children, ...props }: CommonProps) =>
    pdfRender ? <Text {...props}>{children}</Text> : <td {...props}>{children}</td>

export const Th = ({ pdfRender, children, ...props }: CommonProps) =>
    pdfRender ? <Text style={{ fontWeight: 'bold' }} {...props}>{children}</Text> : <th {...props}>{children}</th>

// ...add more as needed

