import Link from "next/link";
import "./SiteFooter.css";

interface Props {
  theme?: "dark" | "light";
}

export default function SiteFooter({ theme = "dark" }: Props) {
  return (
    <footer className={`site-footer site-footer--${theme}`}>
      <div className="site-footer__inner">
        <div className="site-footer__brand">© 2026 MAGIC Group NTS</div>
        <div className="site-footer__legal">
          <span className="site-footer__item">ИП Юдина Татьяна Валерьевна</span>
          <span className="site-footer__dot" />
          <span className="site-footer__item">ИНН&nbsp;330646275536</span>
          <span className="site-footer__dot" />
          <span className="site-footer__item">ОГРНИП&nbsp;316332800103821</span>
        </div>
        <Link href="/privacy" className="site-footer__link">Политика конфиденциальности</Link>
      </div>
    </footer>
  );
}
