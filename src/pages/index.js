import { useState } from "react";

const IndexPage = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/fenci", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (res.status === 200) {
        const data = await res.json(); // 获取分词后的数据

        // 将获取到的数据作为参数发送到另一个 API
        const aiRes = await fetch("/api/ai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }), // 将获取到的数据作为参数发送给 AI API
        });

        if (aiRes.status === 200) {
          const aiData = await aiRes.json();
          setResponse(aiData); // 设置响应数据
        }

        const processData = async ({ done, value }) => {
          if (done) {
            console.log("Stream finished");
            return;
          }

          tempText += new TextDecoder("utf-8").decode(value);
          setResponse(tempText);

          return reader.read().then(processData);
        };

        await processData(await reader.read());
      }
    } catch (error) {
      console.error("请求出错:", error);
    }
  };

  return (
    <div>
      <h1>################</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="请输入问题"
      />
      <button onClick={handleSubmit}>提交</button>
      <div>
        <h2>##########：</h2>
        <div>{response}</div>
      </div>
    </div>
  );
};

export default IndexPage;