import { Collapse } from "antd";
import { useGetArticleById } from "../hooks/useGetArticleById";

type Props = {
  articleId: string;
};

function ArticleDetailsList(props: Props) {
  const { articleId } = props;
  const { data: article } = useGetArticleById(articleId);

  return (
    <>
      {article ? (
        <Collapse
          className="bg-[--light-gray] w-full"
          items={[
            {
              key: article.uid,
              label: article.name,
              children: <div>{article.description}</div>,
            },
          ]}
          bordered={false}
        />
      ) : (
        <div />
      )}
    </>
  );
}

export default ArticleDetailsList;
