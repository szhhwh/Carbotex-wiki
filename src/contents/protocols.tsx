import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import styles from "./protocols.module.css";

interface ProtocolDocument {
  id: string;
  title: string;
  summary?: string;
  pdfUrl?: string;
}

// Upload each finished PDF through iGEM, then add its static.igem.wiki URL here.
const documents: ProtocolDocument[] = [
  { id: "protocol-01", title: "Protocol 01" },
  { id: "protocol-02", title: "Protocol 02" },
  { id: "protocol-03", title: "Protocol 03" },
];

export function Protocols() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Wet lab / Document library</span>
            <h1>Protocols</h1>
            <p>
              A home for the PDF procedures behind our work. Documents will be
              available here as they are finalized.
            </p>
            <a className={styles.heroJump} href="#protocol-library">
              Browse documents <ArrowDown size={18} aria-hidden="true" />
            </a>
          </div>
          <div className={styles.heroArtwork} aria-hidden="true">
            <div className={styles.artworkOrbit} />
            <div className={styles.artworkSheetBack} />
            <div className={styles.artworkSheetFront}>
              <span className={styles.artworkMark}>PDF</span>
              <span className={styles.artworkLine} />
              <span className={styles.artworkLine} />
              <span className={styles.artworkLine} />
              <span className={styles.artworkLine} />
            </div>
          </div>
        </div>
        <div className={styles.heroFoot} aria-hidden="true">
          <span>OUC-HAIDE / 2026</span>
          <span>LAB NOTES · PROTOCOL COLLECTION</span>
        </div>
      </header>

      <section
        className={styles.library}
        id="protocol-library"
        aria-labelledby="library-heading"
      >
        <div className={styles.libraryHeading}>
          <div>
            <span className={styles.eyebrow}>Document index</span>
            <h2 id="library-heading">The protocol library</h2>
          </div>
          <p>
            Each card will open a full PDF protocol once the document is ready.
          </p>
        </div>

        <div className={styles.cardGrid}>
          {documents.map(({ id, title, summary, pdfUrl }, index) => (
            <article className={styles.card} key={id}>
              <div className={styles.cardVisual} aria-hidden="true">
                <span className={styles.cardIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={styles.documentPreview}>
                  <FileText size={38} strokeWidth={1.25} />
                  <span />
                  <span />
                  <span />
                </div>
                <span className={styles.visualLabel}>PDF / DOCUMENT</span>
              </div>
              <div className={styles.cardBody}>
                <span className={styles.cardKicker}>Lab protocol</span>
                <h3>{title}</h3>
                <p>{summary ?? "Document details will be added here."}</p>
                <div className={styles.cardFooter}>
                  {pdfUrl ? (
                    <a
                      className={styles.cardLink}
                      href={pdfUrl}
                      aria-label={`Open ${title} PDF in a new tab`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open PDF <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                  ) : (
                    <span className={styles.pending}>PDF coming soon</span>
                  )}
                  <span className={styles.fileType}>PDF</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
