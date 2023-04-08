import { Analytics } from './analytics.model';
import { Images } from './images.model';
import { Meta } from './meta.model';
import { Pagination } from './pagination.model';
import { User } from './user.model';

export interface TrendingResponse {
  data: TrendingItem[]
  pagination: Pagination
  meta: Meta
}

export interface TrendingItem {
  type: string
  id: string
  url: string
  slug: string
  bitly_gif_url: string
  bitly_url: string
  embed_url: string
  username: string
  source: string
  title: string
  rating: string
  content_url: string
  source_tld: string
  source_post_url: string
  is_sticker: number
  import_datetime: string
  trending_datetime: string
  images: Images
  user?: User
  analytics_response_payload: string
  analytics: Analytics
}
