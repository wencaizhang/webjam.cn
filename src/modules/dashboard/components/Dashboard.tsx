import Breakline from '@/common/components/elements/Breakline';
import { author, featureSwich } from '@/contents/siteMetadata';

import CodingActive from './CodingActive';
import Contributions from './Contributions';

const Dashboard = () => {
  return (
    <>
      {featureSwich.dashboard_wakatime && (
        <>
          <CodingActive />
          <Breakline className='mt-10 mb-8' />
        </>
      )}
      {featureSwich.dashboard_github &&
        author.github_accounts &&
        author.github_accounts.length > 0 && (
          <div className='space-y-10'>
            {author.github_accounts
              ?.filter((account) => account?.is_active)
              .map((account, index) => (
                <Contributions
                  key={index}
                  username={account?.username}
                  type={account?.type}
                  endpoint={account?.endpoint}
                />
              ))}
          </div>
        )}
    </>
  );
};

export default Dashboard;
