import fetch from "node-fetch"

type ApiItem = {
  title: string
  link: string
  contentSnippet?: string
  isoDate?: string
  dateMiliSeconds: number
}

type Response = {
  "data": {
    "contents": {
      "id": number //64217837,
      "type": "TextNote",
      "status": string //"published",
      "name": string //"コンセンサスに対する洗練されたアプローチ",
      "description": null,
      "likeCount": number //11,
      "price": number //0,
      "key": string // "n8b6546129618",
      "slug": string //"slug-n8b6546129618",
      "publishAt": string // "2023-04-13T20:15:38+09:00",
      "thumbnailExternalUrl": "",
      "eyecatch": string // "https://assets.st-note.com/production/uploads/images/102924615/rectangle_large_type_2_e56bc3d5b544856a0b80ce02f3f80d35.png?fit=bounds&quality=85&width=1280",
      "user": {
        "id": number //7422194,
        "key": string //"428c629e7a4049207027ef39cf30a759",
        "name": string //"tequ",
        "urlname": string //"tequ",
        "nickname": string //"tequ",
        "userProfileImagePath": string //"https://assets.st-note.com/production/uploads/images/102653262/profile_a2c7f41e73d6a1b612bba2dde51fd3d3.jpg?fit=bounds&format=jpeg&quality=85&width=330",
        "customDomain": null,
        "disableSupport": boolean,
        "disableGuestPurchase": boolean,
        "emailConfirmedFlag": boolean,
        "likeAppealText": string // "ありがとう！励みになります！",
        "likeAppealImage": string // "https://assets.st-note.com/poc-image/manual/production/preset_reaction_0.png",
        "purchaseAppealTextNote": null,
        "twitterNickname": string //"_TeQu_",
        "shareAppeal": {
          "text": null,
          "image": null
        },
        "magazineAddAppeal": {
          "text": null,
          "image": null
        }
      },
      "canRead": boolean,
      "isAuthor": boolean,
      "externalUrl": null,
      "customDomain": null,
      "body": string // "はじめにこちらは2022年12月にStefan Tomasによって公開された\"An Elegant Approach to Consensus\"の翻訳です。\n\nStefan TomasはBitcoinJSの開発者であり、XRP Ledgerの初期の開発にも携わっていました。\n\nこの翻訳は原著者であるStefan Tomasの許可を得て翻訳したものです。\n翻訳に原著者は関わっておらず、訳者によってのみ行われました。\n\n記事の内容は原文執筆時点のものであり、翻訳時点で既に古くなっ",
      "separator": any,
      "isLimited": boolean,
      "isTrial": boolean,
      "canUpdate": boolean,
      "tweetText": string // "コンセンサスに対する洗練されたアプローチ｜tequ @_TeQu_ #note",
      "isRefund": boolean,
      "isLiked": boolean,
      "commentCount": number,
      "likes": any[],
      "anonymousLikeCount": number,
      "disableComment": boolean,
      "hashtags": {
        "hashtag": {
          "name": string
        }
      }[]
      "twitterShareUrl": string //"https://twitter.com/intent/tweet?url=https://note.com/tequ/n/n8b6546129618&text=%E3%82%B3%E3%83%B3%E3%82%BB%E3%83%B3%E3%82%B5%E3%82%B9%E3%81%AB%E5%AF%BE%E3%81%99%E3%82%8B%E6%B4%97%E7%B7%B4%E3%81%95%E3%82%8C%E3%81%9F%E3%82%A2%E3%83%97%E3%83%AD%E3%83%BC%E3%83%81%EF%BD%9Ctequ+%40_TeQu_ %23note&related=_TeQu_,note_PR",
      "facebookShareUrl": string
      "lineShareUrl": string
      "audio": {},
      "pictures": any[],
      "limitedMessage": any,
      "labels": any[],
      "priorSale": any,
      "canMultipleLimitedNote": boolean,
      "isMembershipConnected": boolean,
      "hasAvailableCirclePlans": boolean,
      "isPinned": boolean,
      "pinnedUserNoteId": any,
      "spEyecatch": string // "https://assets.st-note.com/production/uploads/images/102924615/square_large_e56bc3d5b544856a0b80ce02f3f80d35.png?fit=bounds&format=jpeg&quality=85&width=360",
      "enableBacktoDraft": boolean,
      "notificationMessages": any[],
      "isProfiled": boolean,
      "isForWork": boolean,
      "isCircleDescription": boolean,
      "noteDraft": any,
      "noteUrl": string // "https://note.com/tequ/n/n8b6546129618",
      "imageCount": number,
      "format": "4.0",
      "capabilities": {
        "rubyText": boolean,
        "formulaText": boolean,
        "duplication": boolean
      }
    }[]
    "isLastPage": boolean,
    "totalCount": number
  }
}

const url = 'https://note.com/api/v2/creators/tequ/contents?kind=note&page=1'

export const fetchFromAPI = async (): Promise<ApiItem[]> => {
  const response = await fetch(url)
  const json = (await response.json()) as Response
  return json.data.contents.map((item) => {
    return {
      title: item.name,
      link: item.noteUrl,
      contentSnippet: item.body,
      isoDate: item.publishAt,
      dateMiliSeconds: new Date(item.publishAt).getTime(),
    }
  })
}
