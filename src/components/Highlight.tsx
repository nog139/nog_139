export function Highlight({ text, glow }: { text: string; glow: string }) {
  const at = text.indexOf(glow);
  if (at === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="fx-text">{glow}</span>
      {text.slice(at + glow.length)}
    </>
  );
}
