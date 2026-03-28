# Users Repository

### createUserConversation
| Arguments | Output | Description |
|-|-|-|
| data | { userConversations } | Create and return single record. |
---

### updateUserConversation
| Arguments | Output | Description |
|-|-|-|
| id, userId, data | { userConversations } | Update and return single record. |
---

### softDeleteUserConversation
| Arguments | Output | Description |
|-|-|-|
| id, userId | { userConversations } | Soft delete and return single record. deletedAt = new Date() |
---

## Notes
* Hard delete not necessary. userConversations relies on a conversation (conversationId) and a user (userId) through foreign relation (FK) - if any of the depending relations were to be deleted, the userConversation record is cascaded.
