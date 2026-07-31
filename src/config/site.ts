import {
  Shield, Zap, Sparkles, Bell, Layers,
  MessageSquare, Cake, Star, Swords,
  Users, Volume2, Heart, Trash2,
  Music2,
} from 'lucide-react';
import { botConfig } from './bot';
import { developerConfig } from './developer';

export { botConfig, developerConfig };

export const site = {
  // `bot.commandCount` is overwritten below with the real, auto-counted
  // total from `commandCategories` so it can never drift out of sync.
  bot: botConfig,

  nav: [
    { label: 'Home',     href: '/' },
    { label: 'Commands', href: '/commands' },
    { label: 'Stats',    href: '/stats' },
    { label: 'About',    href: '/about' },
  ],

  features: [
    {
      icon:        Swords,
      title:       'Antinuke Protection',
      description: '11 independent modules guard your server from nukers: channel/role deletion, mass bans, bot adds, dangerous permission grants, and more. Trips once a threshold is crossed, punishes the actor, and reverts the damage.',
    },
    {
      icon:        Shield,
      title:       'Full Moderation Suite',
      description: 'Ban, kick, timeout, strip roles, lockdown channels, purge with 13+ filters, hackban, warnings system, slowmode, nick management, and VC controls, all with DM notifications and modlog integration.',
    },
    {
      icon:        Bell,
      title:       'Server Logging',
      description: 'Seven log categories: channels, members, roles, VC, messages, server, and modlogs. Per-category channel overrides, enable/disable toggles, and exception lists. Modlogs auto-capture every moderation action.',
    },
    {
      icon:        Zap,
      title:       'Utility Powerhouse',
      description: 'Sticky messages, autorole, autoresponders, AFK system, alias shortcuts, interactive embed and CV2 container builders, webhook manager, vanity role system, and more.',
    },
    {
      icon:        Cake,
      title:       'Birthday System',
      description: 'Users set their birthday once and the bot announces it in every configured server on the day. Custom messages with placeholders, saved CV2 payloads, and a list command showing upcoming birthdays.',
    },
    {
      icon:        Sparkles,
      title:       'Fun Commands',
      description: 'Ship compatibility, rating commands (howgay, howcute, howrizz, howsimp, howintelligent, howautistic), wanted posters, who-would-win, tic-tac-toe, rock-paper-scissors PvP, DuckDuckGo image search, and more.',
    },
    {
      icon:        Users,
      title:       'Welcomer System',
      description: 'Greet new members with fully customisable messages: plain text, saved embeds, or interactive CV2 payloads with the complete placeholder system. Toggle bot-join greets independently.',
    },
    {
      icon:        MessageSquare,
      title:       'Rich Info Panels',
      description: 'Userinfo with 4 tabs (About · Roles · Permissions · Assets), serverinfo with 5 tabs, paginated lists of roles/members/bots/emojis/channels/bans, and a detailed debug panel.',
    },
    {
      icon:        Heart,
      title:       'Customisation',
      description: 'Per-server prefix, personal self-prefix, server name style, and bot profile customisation (avatar, banner, bio, username), all from within Discord.',
    },
  ],

  commandCategories: [
    {
      name: 'Info',
      icon: Star,
      commands: [
        { name: '$help',      aliases: ['h'],                  permission: null, description: 'Interactive CV2 help menu with category navigation.',               usage: '$help [category]' },
        { name: '$ping',      aliases: [],                     permission: null, description: 'API latency, WebSocket ping, and database ping.',                   usage: '$ping' },
        { name: '$debug',     aliases: ['botstats'],           permission: null, description: 'Detailed bot stats: clusters, shards, memory, latency, and more.', usage: '$debug' },
        { name: '$uptime',    aliases: [],                     permission: null, description: 'Shows how long the bot has been online.',                           usage: '$uptime' },
        { name: '$developer', aliases: ['dev', 'owner', 'creator'], permission: null, description: 'Info about the developer behind this bot.',              usage: '$developer' },
        { name: '$host',      aliases: ['hosting', 'hoster'],  permission: null, description: 'Shows where the bot is hosted and other technical details.',        usage: '$host' },
      ],
    },
    {
      name: 'Moderation',
      icon: Shield,
      commands: [
        { name: '$ban',            aliases: [],                                     permission: 'Ban Members',       description: 'Ban a user. DMs them first with the reason.',                   usage: '$ban <@user|ID> [reason]' },
        { name: '$kick',           aliases: [],                                     permission: 'Kick Members',      description: 'Kick a member. DMs them first.',                                usage: '$kick <@user> [reason]' },
        { name: '$timeout',        aliases: [],                                     permission: 'Timeout Members',   description: 'Timeout with a duration string like 1h30m or 7d.',             usage: '$timeout <@user> <duration> [reason]' },
        { name: '$untimeout',      aliases: ['removetimeout'],                      permission: 'Timeout Members',   description: 'Remove timeout. No arg = multi-select panel of timed-out members.', usage: '$untimeout [@user]' },
        { name: '$unban',          aliases: [],                                     permission: 'Ban Members',       description: 'Unban by ID. No ID = dropdown of all current bans.',           usage: '$unban [user ID]' },
        { name: '$hackban',        aliases: ['forceban'],                           permission: 'Ban Members',       description: 'Force-ban a user by ID even if they\'re not in the server.',   usage: '$hackban <user ID> [reason]' },
        { name: '$warn',           aliases: [],                                     permission: 'Timeout Members',   description: 'Warn a member. Stored in the database, DMs the target.',       usage: '$warn <@user> <reason>' },
        { name: '$warnings',       aliases: ['warns'],                              permission: null,                description: 'View a member\'s full warning history.',                       usage: '$warnings <@user>' },
        { name: '$clearwarnings',  aliases: ['clearwarns'],                         permission: null,                description: 'Clear all warnings for a member (with confirmation).',         usage: '$clearwarnings <@user>' },
        { name: '$strip',          aliases: [],                                     permission: 'Manage Roles',      description: 'Remove all of a member\'s roles (skips managed/higher roles).', usage: '$strip <@user>' },
        { name: '$lock',           aliases: ['lockchannel'],                        permission: 'Manage Channels',   description: 'Lock a channel: removes Send Messages from @everyone.',         usage: '$lock [#channel]' },
        { name: '$unlock',         aliases: ['unlockchannel'],                      permission: 'Manage Channels',   description: 'Unlock a previously locked channel.',                           usage: '$unlock [#channel]' },
        { name: '$lockdown',       aliases: [],                                     permission: 'Manage Server',     description: 'Lock every text channel in the server. Confirmation required.', usage: '$lockdown\n$lockdown unlock' },
        { name: '$lockdown-lift', aliases: [],                                     permission: 'Manage Server',     description: 'Slash-only counterpart to /lockdown; unlocks every text channel directly.', usage: '/lockdown-lift [reason]' },
        { name: '$role',          aliases: [],                                     permission: 'Manage Roles',      description: 'Add or remove a member role directly, or open the combined role manager.', usage: '$role add <user> [role]\n$role remove <user> [role]\n$role <user>' },
        { name: '$nick',           aliases: ['nickname', 'setnick', 'setnickname'], permission: 'Manage Nicknames',  description: 'Change a member\'s nickname.',                                  usage: '$nick <@user> <nickname>' },
        { name: '$massnick',       aliases: ['massnickname', 'mn'],                 permission: 'Manage Nicknames',  description: 'Change all members\' nicknames (with confirmation).',           usage: '$massnick <nickname>' },
        { name: '$masskick',       aliases: ['mkick'],                              permission: 'Kick Members',      description: 'Kick all members matching criteria (with confirmation).',       usage: '$masskick [filter]' },
        { name: '$roleall',        aliases: ['allrole', 'giveall'],                 permission: 'Manage Roles',      description: 'Give a role to all/humans/bots; a button panel lets you choose the target group.', usage: '$roleall <@role>' },
        { name: '$slowmode',       aliases: ['sm', 'ratelimit'],                    permission: 'Manage Channels',   description: 'Set channel slowmode with a human duration string.',            usage: '$slowmode <30s|5m|2h>' },
        { name: '$reactionmute',   aliases: ['rmute', 'reactmute'],                 permission: 'Manage Roles',      description: 'Deny Add Reactions for a member in every text channel.',       usage: '$reactionmute <@user|ID> [reason]' },
        { name: '$reactionunmute', aliases: ['runmute', 'reactunmute'],             permission: 'Manage Roles',      description: 'Reverse $reactionmute: restore a member\'s reaction ability.', usage: '$reactionunmute <@user|ID> [reason]' },
        { name: '$hide',           aliases: ['hidechannel'],                        permission: 'Manage Channels',   description: 'Hide one or more channels from @everyone.',                     usage: '$hide [#channel ...]' },
        { name: '$unhide',         aliases: ['unhidechannel'],                      permission: 'Manage Channels',   description: 'Unhide one or more previously hidden channels.',                usage: '$unhide [#channel ...]' },
        { name: '$nsfw',           aliases: [],                                     permission: 'Manage Channels',   description: 'Toggle the NSFW flag on one or more channels.',                 usage: '$nsfw [#channel ...]' },
        { name: '$nuke',           aliases: [],                                     permission: 'Manage Channels',   description: 'Delete and instantly recreate one or more channels with identical settings.', usage: '$nuke [#channel ...]' },
        { name: '$delete-channel', aliases: ['deletechannel', 'delchannel'],        permission: 'Manage Channels',   description: 'Delete a channel after a confirmation prompt.',               usage: '$delete-channel [#channel]' },
      ],
    },
    {
      name: 'Security',
      icon: Swords,
      commands: [
        { name: '$antinuke status',    aliases: ['an', 'antinukesetup'], permission: 'Administrator', description: 'View the antinuke master toggle, module count, log channel, and quarantine role.', usage: '$antinuke status' },
        { name: '$antinuke enable',    aliases: ['an', 'antinukesetup'], permission: 'Administrator', description: 'Enable the antinuke system for this server.',               usage: '$antinuke enable' },
        { name: '$antinuke disable',   aliases: ['an', 'antinukesetup'], permission: 'Administrator', description: 'Disable the antinuke system for this server.',              usage: '$antinuke disable' },
        { name: '$antinuke modules',   aliases: ['an', 'antinukesetup'], permission: 'Administrator', description: 'View all 11 modules and their current config.',             usage: '$antinuke modules' },
        { name: '$antinuke module',    aliases: ['an', 'antinukesetup'], permission: 'Administrator', description: 'Configure a specific module: enable/disable, punishment type, threshold.', usage: '$antinuke module <name> enable|disable\n$antinuke module <name> punishment <type>\n$antinuke module <name> threshold <count> <seconds>' },
        { name: '$antinuke whitelist', aliases: ['an', 'antinukesetup'], permission: 'Administrator', description: 'Manage whitelisted users and roles exempt from punishment.', usage: '$antinuke whitelist list\n$antinuke whitelist add <user|role>\n$antinuke whitelist remove <user|role>' },
        { name: '$antinuke logs',      aliases: ['an', 'antinukesetup'], permission: 'Administrator', description: 'Set or disable the antinuke log channel.',                   usage: '$antinuke logs <#channel>\n$antinuke logs disable' },
        { name: '$antinuke profile',   aliases: ['an', 'antinukesetup'], permission: 'Administrator', description: 'Apply a preset: lockdown, strict, balanced, or lenient.',  usage: '$antinuke profile <lockdown|strict|balanced|lenient>' },
        { name: '$antinuke reset',     aliases: ['an', 'antinukesetup'], permission: 'Administrator', description: 'Reset all antinuke config to defaults (with confirmation).', usage: '$antinuke reset' },
      ],
    },
    {
      name: 'Purge',
      icon: Trash2,
      commands: [
        { name: '$purge',          aliases: ['clear'],            permission: 'Manage Messages', description: '13+ subcommands: all, bot, user, text, images, links, between, embeds, reactions, and more.', usage: '$purge <subcommand> [args]' },
        { name: '$purge-till',     aliases: ['purgetill', 'pt'],  permission: 'Manage Messages', description: 'Delete all messages in the channel up to a specific message ID.', usage: '$purge-till <message ID>' },
        { name: '$snipe',          aliases: ['s'],                permission: null,              description: 'Show the last deleted message in a channel.',                   usage: '$snipe [#channel]' },
        { name: '$reactionsnipe',  aliases: ['rs', 'rsnipe'],     permission: null,              description: 'Show the last removed reaction in a channel.',                  usage: '$reactionsnipe [#channel]' },
      ],
    },
    {
      name: 'Utility',
      icon: Zap,
      commands: [
        { name: '$afk',              aliases: [],                                    permission: null,             description: 'Set AFK (server or global). Auto-removed on your next message.',  usage: '$afk [reason]' },
        { name: '$sticky',           aliases: [],                                    permission: 'Manage Server',  description: 'Manage sticky messages: re-posted at the bottom on every new message.', usage: '$sticky set text <content>\n$sticky enable\n$sticky disable\n$sticky view' },
        { name: '$vanityrole',       aliases: ['vr', 'vanityroles'],                 permission: 'Manage Server',  description: 'Auto-assign roles based on a status/bio keyword or the server tag.', usage: '$vanityrole\n$vanityrole status\n$vanityrole bio\n$vanityrole tag' },
        { name: '$alias',            aliases: [],                                    permission: null,             description: 'Create a personal private shortcut for any command.',             usage: '$alias create <name> <command>\n$alias list\n$alias delete <name>' },
        { name: '$list',             aliases: ['ls'],                                permission: null,             description: 'Paginated list of roles, members, bots, emojis, stickers, channels, or bans.', usage: '$list roles|members|bots|emojis|channels|bans' },
        { name: '$whoping',          aliases: ['wp', 'whoponged'],                   permission: null,             description: 'Show the last 10 messages that directly pinged a user in this channel.', usage: '$whoping [@user]' },
        { name: '$ghostping',        aliases: ['gp', 'ghostpng'],                    permission: 'Administrator',  description: 'Ghost-ping up to 10 users, then instantly deletes the message.', usage: '$ghostping <@user1> [@user2] …' },
        { name: '$vanity',           aliases: [],                                    permission: null,             description: 'Look up a Discord vanity URL and check if it\'s taken or available.', usage: '$vanity <url>' },
        { name: '$react',            aliases: ['re'],                                permission: null,             description: 'React to a message with an emoji; targets the reply or the previous message.', usage: '$react <emoji name or ID>' },
        { name: '$archive',          aliases: [],                                    permission: 'Manage Messages',description: 'Save recent channel messages to a .txt file sent to your DMs.',   usage: '$archive [amount]' },
        { name: '$firstmessage',     aliases: ['firstmsg'],                          permission: null,             description: 'Get a jump link to the first message ever sent in this channel.',  usage: '$firstmessage' },
        { name: '$host-image',       aliases: ['hostimage', 'imgbb', 'upload-image'],permission: null,             description: 'Upload an image (attachment or URL) and get back hosted links.',    usage: '$host-image <attachment>\n$host-image <image URL>' },
        { name: '$placeholder-help', aliases: ['placeholders', 'ph', 'phhelp'],      permission: null,             description: 'Paginated reference for all available placeholder tokens.',     usage: '$placeholder-help' },
        { name: '$mynop',            aliases: ['mynoprefix'],                         permission: null,             description: 'Toggle your own noprefix access on or off. Only works if a developer has granted you noprefix access.', usage: '$mynop\n$mynop on\n$mynop off' },
        { name: '$serverinfo',  aliases: ['si', 'guildinfo', 'guild'],   permission: null,             description: '5-tab panel: Overview · Members · Channels · Security · Assets.', usage: '$serverinfo' },
        { name: '$membercount', aliases: ['memcount', 'mc'],             permission: null,             description: 'Show total, user, and bot member counts.',                         usage: '$membercount' },
        { name: '$userinfo',    aliases: ['ui', 'whois'],                permission: null,             description: '4-tab panel: About · Roles · Permissions · Assets. Buttons active 3 min.', usage: '$userinfo [@user]' },
        { name: '$avatar',      aliases: ['av', 'pfp'],                  permission: null,             description: "Show a user's avatar. Prompts server vs global if they differ.",  usage: '$avatar [@user]' },
        { name: '$banner',      aliases: ['bn'],                         permission: null,             description: "Show a user's banner. Prompts server vs global if they differ.",  usage: '$banner [@user]' },
        { name: '$setprefix',   aliases: ['prefix', 'changeprefix'],     permission: 'Manage Server',  description: 'Set a custom command prefix for this server.',                     usage: '$setprefix <new prefix>' },
        { name: '$resetprefix', aliases: [],                             permission: 'Manage Server',  description: 'Reset the server prefix back to the default.',                    usage: '$resetprefix' },
        { name: '$selfprefix',  aliases: ['sp', 'myprefix'],             permission: null,             description: 'Set a personal prefix that works for you in any server.',         usage: '$selfprefix <prefix>\n$selfprefix view\n$selfprefix remove' },
      ],
    },
    {
      name: 'VC Controls',
      icon: Volume2,
      commands: [
        { name: '$join',       aliases: [],                  permission: null,             description: 'Make the bot join your voice channel (or a specified one).', usage: '$join [channel]' },
        { name: '$leave',      aliases: [],                  permission: null,             description: 'Make the bot leave the voice channel.',             usage: '$leave' },
        { name: '$rejoin',     aliases: [],                  permission: null,             description: 'Make the bot rejoin its current voice channel.',    usage: '$rejoin' },
        { name: '$mute',       aliases: [],                  permission: 'Mute Members',   description: 'Server-mute a member in voice chat.',               usage: '$mute <@user>' },
        { name: '$unmute',     aliases: [],                  permission: 'Mute Members',   description: 'Remove server-mute from a member.',                 usage: '$unmute <@user>' },
        { name: '$deafen',     aliases: [],                  permission: 'Deafen Members', description: 'Server-deafen a member in voice chat.',             usage: '$deafen <@user>' },
        { name: '$undeafen',   aliases: [],                  permission: 'Deafen Members', description: 'Remove server-deafen from a member.',               usage: '$undeafen <@user>' },
        { name: '$disconnect', aliases: ['dsc', 'devoice'],  permission: 'Move Members',   description: 'Disconnect a member from their voice channel.',    usage: '$disconnect <@user>' },
        { name: '$shift',      aliases: [],                  permission: 'Move Members',   description: 'Move a member to a different voice channel.',       usage: '$shift <@user> <#channel>' },
      ],
    },
    {
      name: 'Music',
      icon: Music2,
      commands: [
        { name: '$24/7',         aliases: ['247', 'twentyfourseven', 'stay'], permission: null, description: 'Manage 24/7 mode and keep the bot connected to voice.', usage: '$24/7 <enable [channel] | disable | view>' },
        { name: '$add',          aliases: [], permission: null, description: 'Add a song to the queue.', usage: '$add <song name or URL>' },
        { name: '$clear',        aliases: ['cl', 'clearqueue'], permission: null, description: 'Clear all upcoming tracks from the queue.', usage: '$clear' },
        { name: '$grab',         aliases: ['save'], permission: null, description: 'DM yourself the currently playing track details.', usage: '$grab' },
        { name: '$loop',         aliases: ['repeat', 'l'], permission: null, description: 'Toggle loop mode for the current player.', usage: '$loop [none|track|queue]' },
        { name: '$move',         aliases: ['mv'], permission: null, description: 'Move a queued track from one position to another.', usage: '$move <from> <to>' },
        { name: '$nowplaying',   aliases: ['np', 'song', 'current'], permission: null, description: 'Show the currently playing track.', usage: '$nowplaying' },
        { name: '$pause',        aliases: [], permission: null, description: 'Pause the currently playing track.', usage: '$pause' },
        { name: '$peek',         aliases: [], permission: null, description: 'Show a minimal view of the currently playing track.', usage: '$peek' },
        { name: '$play',         aliases: ['p'], permission: null, description: 'Play a song or add it to the queue.', usage: '$play <song name or URL>' },
        { name: '$queue',        aliases: ['q', 'list'], permission: null, description: 'Show completed, current, and upcoming tracks.', usage: '$queue [page]' },
        { name: '$remove',       aliases: ['rm'], permission: null, description: 'Remove a track from the queue by position.', usage: '$remove <position>' },
        { name: '$resume',       aliases: ['unpause', 'res'], permission: null, description: 'Resume a paused track.', usage: '$resume' },
        { name: '$seek',         aliases: [], permission: null, description: 'Seek within the current track.', usage: '$seek <time>' },
        { name: '$servervolume', aliases: ['svol', 'sv'], permission: 'Manage Server', description: 'Set or view the persistent server playback volume.', usage: '$servervolume [1-100]' },
        { name: '$shuffle',      aliases: ['sh'], permission: null, description: 'Shuffle the upcoming tracks in the queue.', usage: '$shuffle' },
        { name: '$skip',         aliases: ['s', 'next'], permission: null, description: 'Skip the currently playing track.', usage: '$skip' },
        { name: '$skipto',       aliases: ['st', 'jumpto', 'jt'], permission: null, description: 'Skip to a specific track in the queue.', usage: '$skipto <position>' },
        { name: '$stop',         aliases: ['dc'], permission: null, description: 'Stop playback and disconnect the bot. In 24/7 mode, stops the queue but keeps the bot in voice.', usage: '$stop' },
        { name: '$volume',       aliases: ['vol', 'v'], permission: null, description: 'Set or view playback volume.', usage: '$volume [1-100]' },
      ],
    },
    {
      name: 'Features',
      icon: Layers,
      commands: [
        { name: '$greet',                   aliases: ['welcomer', 'welcome'], permission: 'Manage Server', description: 'Show current welcomer configuration for this server.',    usage: '$greet' },
        { name: '$greet channel set',       aliases: ['welcomer', 'welcome'], permission: 'Manage Server', description: 'Set the channel where welcome messages are sent.',        usage: '$greet channel set <#channel>' },
        { name: '$greet channel remove',    aliases: ['welcomer', 'welcome'], permission: 'Manage Server', description: 'Remove the greet channel, which disables welcome messages.',   usage: '$greet channel remove' },
        { name: '$greet channel view',      aliases: ['welcomer', 'welcome'], permission: 'Manage Server', description: 'View the current greet settings.',                        usage: '$greet channel view' },
        { name: '$greet message set',       aliases: ['welcomer', 'welcome'], permission: 'Manage Server', description: 'Set the welcome message text, optionally with a saved data payload.', usage: '$greet message set <text> [data: <name>]' },
        { name: '$greet message remove',    aliases: ['welcomer', 'welcome'], permission: 'Manage Server', description: 'Clear the welcome message.',                               usage: '$greet message remove' },
        { name: '$greet test',              aliases: ['welcomer', 'welcome'], permission: 'Manage Server', description: 'Send a test welcome message as if you just joined.',      usage: '$greet test' },
        { name: '$greet bots',              aliases: ['welcomer', 'welcome'], permission: 'Manage Server', description: 'Toggle whether bot joins trigger the welcome message.',   usage: '$greet bots [on|off]' },
        { name: '$birthday',                aliases: ['bday', 'bd'],          permission: null,            description: 'Show server birthday config and your own birthday.',        usage: '$birthday' },
        { name: '$birthday set',            aliases: ['bday', 'bd'],          permission: null,            description: 'Set your birthday, applies across all mutual servers.',    usage: '$birthday set <date>' },
        { name: '$birthday unset',          aliases: ['bday', 'bd'],          permission: null,            description: 'Remove your birthday.',                                     usage: '$birthday unset' },
        { name: '$birthday list',           aliases: ['bday', 'bd'],          permission: null,            description: 'Upcoming birthdays of members in this server, sorted by soonest.', usage: '$birthday list' },
        { name: '$birthday channel set',    aliases: ['bday', 'bd'],          permission: 'Manage Server', description: 'Set the channel for birthday announcements.',              usage: '$birthday channel set <#channel>' },
        { name: '$birthday channel remove', aliases: ['bday', 'bd'],          permission: 'Manage Server', description: 'Remove the birthday announcement channel.',                usage: '$birthday channel remove' },
        { name: '$birthday message set',    aliases: ['bday', 'bd'],          permission: 'Manage Server', description: 'Set the birthday announcement text or link a saved payload.', usage: '$birthday message set <text>\n$birthday message set data:<name>' },
        { name: '$log',         aliases: ['logs', 'logging'], permission: 'Manage Server', description: 'Open the interactive logging config panel or set a category inline.', usage: '$log\n$log <category> <#channel>\n$log <category> enable|disable' },
        { name: '$log channel', aliases: ['logs', 'logging'], permission: 'Manage Server', description: 'Configure logging for channel events (create, delete, update).',      usage: '$log channel <#channel|enable|disable>' },
        { name: '$log member',  aliases: ['logs', 'logging'], permission: 'Manage Server', description: 'Configure logging for member join/leave/update events.',              usage: '$log member <#channel|enable|disable>' },
        { name: '$log message', aliases: ['logs', 'logging'], permission: 'Manage Server', description: 'Configure logging for message edits and deletes.',                    usage: '$log message <#channel|enable|disable>' },
        { name: '$log modlog',  aliases: ['logs', 'logging'], permission: 'Manage Server', description: 'Configure the modlog channel (ban, kick, timeout, warn, etc.).',     usage: '$log modlog <#channel|enable|disable>' },
        { name: '$log role',    aliases: ['logs', 'logging'], permission: 'Manage Server', description: 'Configure logging for role create/delete/update events.',             usage: '$log role <#channel|enable|disable>' },
        { name: '$log vc',      aliases: ['logs', 'logging'], permission: 'Manage Server', description: 'Configure logging for voice state changes.',                          usage: '$log vc <#channel|enable|disable>' },
        { name: '$log server',  aliases: ['logs', 'logging'], permission: 'Manage Server', description: 'Configure logging for server (guild) update events.',                 usage: '$log server <#channel|enable|disable>' },
        { name: '$autoresponder', aliases: ['ares', 'autoresponders'], permission: 'Manage Server', description: 'Create, edit, and manage triggers that auto-reply or react to matching messages.', usage: '$autoresponder\n$autoresponder add <trigger>\n$autoresponder list\n$autoresponder remove <trigger>' },
        { name: '$customrole create',  aliases: ['cr', 'crole'], permission: 'Manage Roles', description: 'Register a keyword and link up to 5 roles to it. Anyone with Manage Roles can then use that keyword as a command to assign those roles to up to 10 mentioned users, or remove them with the remove keyword. Max 15 keywords per server. Does not work with noprefix.',        usage: '$customrole create <keyword> <@role> [@role2 …]' },
        { name: '$customrole delete',  aliases: ['cr', 'crole'], permission: 'Manage Roles', description: 'Remove a custom role keyword from the server.',                                                                                                                                                                                       usage: '$customrole delete <keyword>' },
        { name: '$customrole list',    aliases: ['cr', 'crole'], permission: 'Manage Roles', description: 'Show all custom role keywords configured in this server.',                                                                                                                                                                             usage: '$customrole list' },
        { name: '$customrole info',    aliases: ['cr', 'crole'], permission: 'Manage Roles', description: 'Show the roles linked to a specific keyword.',                                                                                                                                                                                         usage: '$customrole info <keyword>' },
        { name: '$customrole add',     aliases: ['cr', 'crole'], permission: 'Manage Roles', description: 'Link additional roles to an existing keyword (max 5 total per keyword).',                                                                                                                                                              usage: '$customrole add <keyword> <@role> [@role2 …]' },
        { name: '$customrole remove',  aliases: ['cr', 'crole'], permission: 'Manage Roles', description: 'Unlink specific roles from a keyword. If the last role is removed, the keyword is deleted.',                                                                                                                                           usage: '$customrole remove <keyword> <@role> [@role2 …]' },
        { name: '$translate',  aliases: ['tr', 'translate-es', 'translate-hi', 'translate-fr', 'translate-de', 'translate-ja', 'translate-es-mx'], permission: null, description: 'Translate text from any language to English (default) or a target language. Use $translate-es for Spanish, $translate-hi for Hindi, $translate-fr for French, $translate-de for German, $translate-ja for Japanese, $translate-es-mx for Mexican Spanish.', usage: '$translate <text>\n$translate-es <text>\n$translate-hi <text>\n$translate-fr <text>\n$translate-de <text>\n$translate-ja <text>\n$translate-es-mx <text>' },
        { name: '$embed',     aliases: ['embedbuilder', 'eb'],              permission: null,              description: 'Interactive classic-embed builder with live preview, fields, and link buttons.', usage: '$embed' },
        { name: '$container', aliases: ['cb', 'containerbuilder', 'build'], permission: null,              description: 'Interactive CV2 message builder: text, info card, photo grid, quick links.', usage: '$container' },
        { name: '$webhook',   aliases: ['webhooks', 'wh'],                  permission: 'Manage Webhooks', description: 'Interactive webhook manager: create, send, rename, move, delete.', usage: '$webhook' },
        { name: '$autorole',  aliases: ['ar', 'autoroles'],                permission: 'Manage Roles',   description: 'Configure roles given automatically to new members or bots.',     usage: '$autorole member add @role\n$autorole bot add @role\n$autorole member|bot remove @role\n$autorole list\n$autorole clear' },
      ],
    },
    {
      name: 'Data',
      icon: MessageSquare,
      commands: [
        { name: '$create-data', aliases: ['createdata', 'cdata'],           permission: 'Administrator', description: 'Save a reusable message, embed, or CV2 payload for later.', usage: '$create-data <message|embed|cv2> [content or attachment]' },
        { name: '$view-data',   aliases: ['viewdata', 'vdata'],             permission: 'Administrator', description: 'Browse and send saved payloads via an interactive dropdown.',            usage: '$view-data' },
        { name: '$delete-data', aliases: ['deletedata', 'ddata', 'deldata'],permission: 'Administrator', description: 'Delete saved data with a confirm/cancel prompt.',                        usage: '$delete-data' },
        { name: '$send-data',   aliases: ['senddata', 'sdata'],             permission: 'Administrator', description: 'Send a saved payload directly; the panel disappears after send.',       usage: '$send-data' },
      ],
    },
    {
      name: 'Customisation',
      icon: Heart,
      commands: [
        { name: '$namestyle',    aliases: ['ns'],                permission: 'Manage Server', description: 'Set the bot\'s display name style for your server.',     usage: '$namestyle' },
        { name: '$setavatar',    aliases: ['setav', 'setpfp'],   permission: 'Administrator', description: 'Change the bot\'s avatar (developer).',                  usage: '$setavatar [image URL or attachment]' },
        { name: '$setbanner',    aliases: ['setbn', 'setcover'], permission: 'Administrator', description: 'Change the bot\'s profile banner.',                      usage: '$setbanner [image URL or attachment]' },
        { name: '$setbio',       aliases: [],                    permission: 'Administrator', description: 'Change the bot\'s about-me bio.',                        usage: '$setbio <text>' },
        { name: '$setname',      aliases: [],                    permission: 'Administrator', description: 'Change the bot\'s username.',                            usage: '$setname <name>' },
        { name: '$resetprofile', aliases: [],                    permission: 'Administrator', description: 'Reset bot profile to default values.',                   usage: '$resetprofile' },
      ],
    },
    {
      name: 'Fun',
      icon: Sparkles,
      commands: [
        { name: '$ship',           aliases: [],                                 permission: null, description: 'Generate a compatibility image for two users.',                  usage: '$ship <@user1> <@user2>' },
        { name: '$howgay',         aliases: ['gay'],                                        permission: null, description: 'See how gay someone is, returns a percentage rating.',  usage: '$howgay [@user]' },
        { name: '$howsimp',        aliases: ['simp'],                                       permission: null, description: 'See how much of a simp someone is.',                 usage: '$howsimp [@user]' },
        { name: '$howcute',        aliases: ['cute'],                                       permission: null, description: 'Rate how cute someone is.',                           usage: '$howcute [@user]' },
        { name: '$howautistic',    aliases: ['autistic'],                                   permission: null, description: 'Rate someone\'s autism level.',                       usage: '$howautistic [@user]' },
        { name: '$howintelligent', aliases: ['intelligent', 'iq', 'howsmart', 'intelligence'], permission: null, description: 'Rate someone\'s IQ / intelligence.',           usage: '$howintelligent [@user]' },
        { name: '$howrizz',        aliases: ['rizz'],                                       permission: null, description: 'See how much rizz someone has.',                      usage: '$howrizz [@user]' },
        { name: '$wanted',         aliases: [],                                 permission: null, description: 'Generate a Wild West wanted poster for a user.',                 usage: '$wanted [@user]' },
        { name: '$whowouldwin',    aliases: ['wwn'],                            permission: null, description: 'See who would win in a battle between two users.',               usage: '$whowouldwin <@user1> <@user2>' },
        { name: '$tictactoe',      aliases: ['ttt'],                            permission: null, description: 'Play tic tac toe against another member or the bot.',            usage: '$tictactoe [@user]' },
        { name: '$rps',            aliases: ['rockpaperscissors'],              permission: null, description: 'Rock paper scissors: vs the bot or PvP against another user.', usage: '$rps [@user]' },
        { name: '$guessthenumber', aliases: ['gtn'],                            permission: null, description: 'Guess the number the bot is thinking of.',                       usage: '$guessthenumber' },
        { name: '$image',          aliases: ['img', 'imagesearch'],             permission: null, description: 'Search for an image using DuckDuckGo (safe search enforced).',   usage: '$image <query>' },
      ],
    },
  ] as const,

  faqs: [
    {
      q: 'Is Levitate free to use?',
      a: 'Yes, completely. All commands and features are free with no premium tiers or paywalls.',
    },
    {
      q: 'What is the default prefix?',
      a: 'The default prefix is `$`. Server admins can change it with `$setprefix`, and individual users can set a personal prefix with `$selfprefix`.',
    },
    {
      q: 'How do I add Levitate to my server?',
      a: 'Click the "Add to Discord" button, authorize the bot, and you\'re ready. The bot works immediately with no setup required.',
    },
    {
      q: 'Does Levitate support slash commands?',
      a: 'Yes. Most commands have both a prefix variant and a slash command. Slash commands are globally registered at startup.',
    },
    {
      q: 'Does Levitate read or log my messages?',
      a: 'Only if you explicitly enable the message logging category with `$log message`. The bot does not store message content by default.',
    },
    {
      q: 'How does the antinuke system work?',
      a: 'Levitate watches 11 event types and tracks action counts in sliding time windows. When a threshold is crossed the actor is punished (kick, ban, strip roles, or quarantine) and the damage is reverted where possible, with no setup required.',
    },
    {
      q: 'Can I use Levitate without a prefix?',
      a: 'Noprefix access is granted by the developer to specific trusted users. You can also @mention the bot as a prefix.',
    },
    {
      q: 'Where can I get help or report a bug?',
      a: 'Join the support server at discord.gg/YpCfcCTXdv and post in the appropriate channel.',
    },
  ],
};

// Total command count is derived from the actual command list above —
// never hand-edit `botConfig.commandCount`, it's overwritten here so every
// page (hero stats, footer, about, commands header) always agrees.
//
// Rows above list every subcommand/usage variant separately for
// documentation purposes (e.g. `$antinuke status`, `$antinuke enable`, ...
// all live under one `$antinuke` command). The count must dedupe by the
// base command name so it matches the bot's own command total (each
// command *file*, not each documented subcommand row).
botConfig.commandCount = new Set(
  site.commandCategories.flatMap((cat) => cat.commands.map((cmd) => cmd.name.split(' ')[0])),
).size;

export type CommandCategory = (typeof site.commandCategories)[number];
export type Command = CommandCategory['commands'][number];
