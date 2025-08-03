import React from 'react';

export default function Header() {
  return (
    <header className="bg-blue-600 p-4 text-white">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">CRUD Project</h1>
        <p className="italic">This is a CRUD project</p>
      </div>
    </header>
  );
}
