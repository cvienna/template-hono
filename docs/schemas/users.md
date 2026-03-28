# Users Schema

### Table: userConversations
| Column | Description |
|-|-|
| id | |
| userId | foreign relation to users (auth) table. ( onDelete: "cascade" ), important for cleanup |
| conversationId | foreign relation to conversation table. ( onDelete: "cascade" ), important for cleanup |
| lastSeenAt | last time the user read the parent conversation.Used to calculate any new mails in conversation by checking if conversations.updatedAt is more recent than this column. |
| deletedAt | soft delete. When this is set to not null, we run a quick query to see if ALL other userConversatiosn that points to the same conversation are also all soft deleted, if this is true for all. then we can soft delete the parent conversation. |
| ? category -> userConversation map | not for this table, but later through a map table |
