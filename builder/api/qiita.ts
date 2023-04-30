import fetch from 'node-fetch'

type ApiItem = {
  title: string
  link: string
  contentSnippet?: string
  isoDate?: string
  dateMiliSeconds: number
}

type Response = {
  rendered_body: string // "<h1>Example</h1>",
  body: string // "# Example",
  coediting: boolean //false,
  comments_count: number // 100,
  created_at: string // "2000-01-01T00:00:00+00:00",
  group?: {
    created_at: string // "2000-01-01T00:00:00+00:00",
    description: string // "This group is for developers.",
    name: string // "Dev",
    private: boolean // false,
    updated_at: string // "2000-01-01T00:00:00+00:00",
    url_name: string // "dev"
  }
  id: string // "c686397e4a0f4f11683d",
  likes_count: number //100,
  private: boolean //false,
  reactions_count: number //100,
  stocks_count: number //100,
  tags: [
    {
      name: string // "Ruby",
      versions: string[] // ["0.0.1"]
    }
  ]
  title: string //"Example title",
  updated_at: string // "2000-01-01T00:00:00+00:00",
  url: string // "https://qiita.com/Qiita/items/c686397e4a0f4f11683d",
  user: {
    description: string // "Hello, world.",
    facebook_id: string //"qiita",
    followees_count: number // 100,
    followers_count: number //  200,
    github_login_name: string //"qiitan",
    id: string //"qiita",
    items_count: number // 300,
    linkedin_id: string // "qiita",
    location: string // "Tokyo, Japan",
    name: string // "Qiita キータ",
    organization: string // "Qiita Inc.",
    permanent_id: 1
    profile_image_url: string //"https://s3-ap-northeast-1.amazonaws.com/qiita-image-store/0/88/ccf90b557a406157dbb9d2d7e543dae384dbb561/large.png?1575443439",
    team_only: false
    twitter_screen_name: string // "qiita",
    website_url: string //"https://qiita.com"
  }
  page_views_count: number // 100,
  team_membership?: {
    name: string //"Qiita キータ"
  }
  organization_url_name: 'qiita-inc'
}[]

const url = 'https://qiita.com/api/v2/users/tequ/items?per_page=100'

export const fetchFromAPI = async (): Promise<ApiItem[]> => {
  const response = await fetch(url)
  const json = (await response.json()) as Response
  return json.map((item) => {
    return {
      title: item.title,
      link: item.url,
      contentSnippet: item.body,
      isoDate: item.created_at,
      dateMiliSeconds: new Date(item.created_at).getTime(),
    }
  })
}
