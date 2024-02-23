use anchor_lang::prelude::*;

declare_id!("5MTTqsGoj5JjXeyEoA8MCSFgDN3HMjJo8q9E6oxuLatk");

#[program]
pub mod opika_voting_system {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    pub fn create_vote_topic(
        ctx: Context<CreateVoteTopic>,
        title: String,
        options: Vec<String>,
    ) -> Result<()> {
        let vote_topic = &mut ctx.accounts.vote_topic_account;
        vote_topic.title = title;
        vote_topic.options = options.clone();
        vote_topic.vote_counts = vec![0; options.len()];
        Ok(())
    }

    pub fn cast_vote(ctx: Context<CastVote>, option_index: u8) -> Result<()> {
        let vote_topic = &mut ctx.accounts.vote_topic_account;
        if (option_index as usize) < vote_topic.options.len() {
            vote_topic.vote_counts[option_index as usize] += 1;
        } else {
            return Err(error!(ErrorCode::InvalidOptionIndex));
        }
        Ok(())
    }

    pub fn get_vote_count(ctx: Context<CastVote>, option_index: u8) -> Result<u64> {
        let vote_topic = &ctx.accounts.vote_topic_account;
        if (option_index as usize) < vote_topic.options.len() {
            Ok(vote_topic.vote_counts[option_index as usize])
        } else {
            Err(error!(ErrorCode::InvalidOptionIndex))
        }
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct CreateVoteTopic<'info> {
    #[account(init, payer = user, seeds = [b"data",user.key().as_ref()],bump, space = 8 + std::mem::size_of::<VoteTopicsRegistry>()) ]
    pub vote_registry_account: Account<'info, VoteTopicsRegistry>,
    #[account(init, payer = user, seeds = [b"data",user.key().as_ref()],bump, space = 8 + std::mem::size_of::<VoteTopic>())]
    pub vote_topic_account: Account<'info, VoteTopic>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CastVote<'info> {
    #[account(mut)]
    pub vote_topic_account: Account<'info, VoteTopic>,
}

#[account]
pub struct VoteTopic {
    pub title: String,
    pub options: Vec<String>,
    pub vote_counts: Vec<u64>,
}

#[account]
pub struct VoteTopicsRegistry {
    pub vote_topics: [String; 10], //Max String size 100 bytes
}

#[error_code]
pub enum ErrorCode {
    #[msg("The provided option index is invalid.")]
    InvalidOptionIndex,
}
