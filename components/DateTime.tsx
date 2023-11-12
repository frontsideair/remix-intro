type Props = {
  date: Date;
};

const formatter = new Intl.DateTimeFormat("en-TR", {
  dateStyle: "long",
  timeStyle: "short",
});

export default function DateTime({ date }: Props) {
  const iso = date.toISOString();
  return (
    <time dateTime={iso} suppressHydrationWarning>
      {formatter.format(date)}
    </time>
  );
}
