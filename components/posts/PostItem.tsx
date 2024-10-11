'use client';

type PostItemProps = {
  item: any;
};

function PostItem({ item }: PostItemProps) {
  return (
    <div className="text-white">
      <div className="flex items-center gap-2">
        <span className="w-[50px] h-[50px] rounded-[50%] bg-white"></span>
        <p>{item.user}</p>
      </div>
      <div>
        <p className="text-lg font-bold">{item.title}</p>
        <p>{item.desc}</p>
      </div>
    </div>
  );
}

export default PostItem;
