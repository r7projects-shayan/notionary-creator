import React from 'react';
import { Button } from '@/components/ui/button';

export const Settings = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Account</h3>
          <Button>Change Password</Button>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Notifications</h3>
          <Button>Manage Notifications</Button>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Upgrade to Premium</h3>
          <Button>Upgrade Now</Button>
        </div>
      </div>
    </div>
  );
};