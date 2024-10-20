import type { InputFile } from "telegraf/types"

export type FunctionResult = {
  /**
   * mainly provided from cobalt.tools
   */
  error?: {
    /**
     * humanly readable code string
     */
    code: string
  }
  /**
   * url to file array
   */
  files: string[]
  /**
   * url to url array
   */
  source: string[]
}

export type MediaGroup = { type: string, media: string | InputFile }[]