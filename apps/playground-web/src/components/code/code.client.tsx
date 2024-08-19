import { useQuery } from "@tanstack/react-query";
import type { BundledLanguage } from "shiki";
import { RenderCode } from "./RenderCode";
import { getCodeHtml } from "./getCodeHtml";

// Use CodeClient where the code changes based user input
// Using RSC in that scenario feels too slow and unnecessary keep hitting the server

export type CodeProps = {
  code: string;
  lang: BundledLanguage;
  loader: React.ReactNode;
};

export const CodeClient: React.FC<CodeProps> = ({ code, lang, loader }) => {
  const codeQuery = useQuery({
    queryKey: ["html", code],
    queryFn: () => getCodeHtml(code, lang),
  });

  if (!codeQuery.data) {
    return loader;
  }

  return (
    <RenderCode
      code={codeQuery.data.formattedCode}
      html={codeQuery.data.html}
    />
  );
};

export default CodeClient;
