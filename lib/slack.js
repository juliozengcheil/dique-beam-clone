import { serverEnv } from '@/env/server'

export function postToSlackIfEnabled({
  post,
  authorName,
}) {
  if (serverEnv.ENABLE_SLACK_POSTING && serverEnv.SLACK_WEBHOOK_URL) {
    return fetch(serverEnv.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*<${serverEnv.NEXT_APP_URL}/post/${post.id}|${post.title}>*`,
            },
          },
          {
            type: 'context',
            elements: [
              {
                type: 'plain_text',
                text: authorName,
                emoji: true,
              },
            ],
          },
        ],
      }),
    })
  }
}
