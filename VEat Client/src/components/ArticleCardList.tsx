import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { tp } from "../routing";
import { Article } from "../api/restaurant";

type Props = {
  articleList: Article[];
};

function ArticleCardList(props: Props) {
  const { articleList } = props;

  const navigate = useNavigate();

  const truncateTextWithEllipsis = (text: string) => {
    const maxLenght = 60;
    if (text.length > maxLenght) {
      return text.slice(0, maxLenght) + "...";
    }
    return text;
  };

  return (
    <div className="text-xs text-[--gray] mt-2">
      <div className="mt-2 text-base">
        {articleList.map((article) => {
          return (
            <div
              className="bg-white mb-7 rounded-2xl flex shadow-md h-36"
              key={nanoid()}
              onClick={() => {
                navigate(tp("/article/:articleId", [article.uid]));
              }}
            >
              <img
                src={article.photo}
                alt={`${article.name} logo`}
                className="w-1/2 rounded-l-2xl shadow-md h-full object-cover"
              />
              <div className="ml-2 flex flex-col bg-white rounded-r-2xl">
                <div className="bg-transparent mt-1 font-bold whitespace-pre-wrap text-sm mb-2 text-black">
                  {article.name}
                </div>
                <div className="flex flex-col bg-white text-[--gray] rounded-r-2xl text-xs">
                  {truncateTextWithEllipsis(article.description)}
                </div>
                <div className="bg-transparent mt-auto font-bold whitespace-pre-wrap text-sm mb-2 text-black justify-end flex items-end pr-2">
                  {article.price} €
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ArticleCardList;
