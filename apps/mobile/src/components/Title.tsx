type Props = {
  title: string;
};

export default function Title({ title }: Props) {
  return <div className="text-2xl font-bold">{title}</div>;
}
