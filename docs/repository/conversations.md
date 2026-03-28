# Conversations Repository

### getConversationsByUser
| Arguments | Output | Description |
|-|-|-|
| userId | { user_conversations, conversations }[] | Get all userConversations by userId. Join together userConversations with conversations. Provides pagination, sorts by updatedAt and falls back to createdAt for where updatedAt is null. Single query. |
---

### getConversationsById
| Arguments | Output | Description |
|-|-|-|
| id, userId | { user_conversations, conversations } | Get single userConversation by id and userId. Join together userConversation with conversation. Single query. |
---

### createConversation
| Arguments | Output | Description |
|-|-|-|
| data | { conversations } | Create and return single record. |
---

### updateConversation
| Arguments | Output | Description |
|-|-|-|
| data (partial) | { conversations } | Update and return single record. |
---

### softDeleteConversation
| Arguments | Output | Description |
|-|-|-|
| id | { conversations } | Soft delete and return single record. deletedAt = new Date() |
---

### hardDeleteConversation
| Arguments | Output | Description |
|-|-|-|
| id | void | Hard delete single record. |
---

## Notes
* get by user - needs to return pages for pagination
* Soft delete - if all corresponding userConversations pointing to said conversation were to be softDeleted -> if so; soft delete conversation also.
* Hard delete - criteria for triggering: soft deleted for 30 days; then hard delete.
