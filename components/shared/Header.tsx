type HeaderProps = {
  title: string;
  subTitle?: string;
};

const Header = ({ title, subTitle }: HeaderProps) => {
  return (
    <>
      <h2 className="h2-bold text-primary ">{title}</h2>
      {subTitle && <p className="mt-4 text-slate-400">{subTitle}</p>}
    </>
  );
};

export default Header;
