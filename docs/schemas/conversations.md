# Conversations Schema

### conversations
| Column | Description |
|-|-|
| id | |
| providerId | id at the mail provider, example: google has threadId |
| subject | subject of the conversation, extracted into conversation to reduce storing unneccessary data |
| preview | small text snippet for the conversation to get a quick preview |
| summary | Ai summary of the conversation |
| createdAt | |
| updatedAt | When a new mail is sent to this conversation, set updatedAt to now(). |
| deletedAt | soft delete, triggers when all users with access to this conversation has soft deleted it, when all have soft deleted it, we apply a global soft delete to this conversation, 30 days soft deleted and we hard delete. |
