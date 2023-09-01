export default function TextGrid({
  subtitle,
  text,
}: {
  subtitle: string;
  text: string;
}) {
  return (
    <div>
      <p>{subtitle}</p>
      <span className="text-green-400 text-2xl">{text}</span>
    </div>
  );
}
