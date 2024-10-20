import type { APIRequest, APIResponse } from "./types/v10.ts"
import type { FunctionResult } from "./types/other.ts"

const httpClient = Deno.createHttpClient({
  poolMaxIdlePerHost: 0
})

export async function getFiles(urls: IterableIterator<RegExpMatchArray>): Promise<FunctionResult> {
  const files: string[] = []
  const source: string[] = []

  for (const url of urls) {
    source.push(url[0])

    const response = await fetch("https://cobalt.curly.team/", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Api-Key 4909763d-7524-42a1-83f0-35d249a3d0e0",
        "User-Agent": "sho/0.10.0"
      },
      body: JSON.stringify({
        url: url[0],
        filenameStyle: "pretty",
      } satisfies APIRequest),
      client: httpClient
    })

    const json: APIResponse = await response.json()
    if (json.status.match(/(rate-limit|error)/))
      return { files: [], source: [], error: { code: "error.api.generic" } }

    switch (json.status) {
      case "picker":
        json.picker.forEach(data => files.push(data.url))
        break
      case "tunnel":
      case "redirect":
        files.push(json.url)
        break
    }
  }

  return { files, source }
}