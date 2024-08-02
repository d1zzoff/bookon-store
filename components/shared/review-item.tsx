import { ThumbsDown, ThumbsUp, User } from "lucide-react";
import { Rating } from "./rating";

export const ReviewItem = () => {
  return (
    <div className="w-full rounded-[20px] bg-light p-5">
      <div className="flex items-center gap-[10px]">
        <div className="w-[55px] h-[55px] rounded-full bg-grey-200 flex items-center justify-center">
          <User className="w-[35px] h-[35px] text-grey-300" strokeWidth={2} />
        </div>

        <div className="flex flex-col gap-[7px]">
          <b className="leading-none text-[18px]">Егор Головахин</b>
          <h6 className="text-grey-400 leading-none">Рейтинг: Читатель</h6>
        </div>
      </div>

      <p className="my-5">
        Это лучшая книга которую я читал в своей жизни, реально, она идеальная
        простоооо! Всем советую почитать ребята!
      </p>

      <div className="flex items-center w-full gap-[30px]">
        <div className="flex items-center gap-[10px]">
          <button className="flex items-center gap-[5px]">
            <ThumbsUp className="text-green" />
            <b>10</b>
          </button>

          <button className="flex items-center gap-[5px]">
            <ThumbsDown className="text-red" />
            <b>15</b>
          </button>
        </div>

        <Rating value={3} className="ml-[-3px]" />
      </div>
    </div>
  );
};
