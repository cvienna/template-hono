# Mails Schema

### Table: mails
| Column | Description |
|-|-|
| id | |
| conversationId | reference to conversations table, ( onDelete: "cascade" ) |
| providerId | TODO |
| from | TODO |
| replyTo | reference to own table, is not a foreign relation |
| createdAt | |
