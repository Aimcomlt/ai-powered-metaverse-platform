import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AIArchitect from '../AIArchitect';
import BlockchainBattalion from '../BlockchainBattalion';
import useFactionMetadata from '../../hooks/useFactionMetadata';

jest.mock('../../hooks/useFactionMetadata');
const mockUseFactionMetadata = useFactionMetadata as jest.Mock;

describe('Faction pages', () => {
  beforeEach(() => {
    mockUseFactionMetadata.mockReset();
  });

  it('renders AI Architect metadata', () => {
    mockUseFactionMetadata.mockReturnValue({
      data: { title: 'AI Architect', description: 'Design AI systems' },
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/ai-architect']}>
        <Routes>
          <Route path="/ai-architect" element={<AIArchitect />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /AI Architect/i })).toBeInTheDocument();
    expect(screen.getByText(/Design AI systems/i)).toBeInTheDocument();
  });

  it('renders Blockchain Battalion metadata', () => {
    mockUseFactionMetadata.mockReturnValue({
      data: { title: 'Blockchain Battalion', description: 'Guardians of chains' },
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/blockchain-battalion']}>
        <Routes>
          <Route path="/blockchain-battalion" element={<BlockchainBattalion />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Blockchain Battalion/i })).toBeInTheDocument();
    expect(screen.getByText(/Guardians of chains/i)).toBeInTheDocument();
  });
});
