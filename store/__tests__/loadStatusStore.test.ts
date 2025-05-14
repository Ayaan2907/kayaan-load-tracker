import { LOAD_STATUSES, STATUS_UPDATE_INTERVAL } from '@/constants/StatusConstants';
import { useLoadStatusStore } from '../loadStatusStore';

// Use Jest's fake timers
jest.useFakeTimers();

describe('useLoadStatusStore', () => {
  const initialStoreState = useLoadStatusStore.getState();

  beforeEach(() => {
    useLoadStatusStore.setState(initialStoreState, true);
    jest.clearAllMocks();
    jest.clearAllTimers();
      
    // Spy on console.log as it's used in the store
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.log as jest.Mock).mockRestore();
  });

  it('should initialize with correct default values', () => {
    const state = useLoadStatusStore.getState();
    expect(state.isTracking).toBe(false);
    expect(state.currentStatusIndex).toBe(-1);
    expect(state.currentStatusProgress).toBe(0);
    expect(state.intervalId).toBeNull();
    expect(state.statuses).toEqual(LOAD_STATUSES);
  });

  describe('startTracking action', () => {
    it('should set initial tracking states and start an interval', () => {
      const { startTracking } = useLoadStatusStore.getState();
      startTracking();

      const state = useLoadStatusStore.getState();
      expect(state.isTracking).toBe(true);
      expect(state.currentStatusIndex).toBe(0);
      expect(state.currentStatusProgress).toBe(0);
      expect(state.intervalId).not.toBeNull(); 
    });

    it('should clear an existing interval if startTracking is called again', () => {
      const { startTracking } = useLoadStatusStore.getState();
      
      startTracking(); // Call 1
      const firstIntervalId = useLoadStatusStore.getState().intervalId;

      startTracking(); // Call 2
      const secondIntervalId = useLoadStatusStore.getState().intervalId;

      expect(firstIntervalId).not.toBeNull();
      expect(secondIntervalId).not.toBeNull();
      expect(secondIntervalId).not.toBe(firstIntervalId);
    });

    it('should increment progress over time and call _nextStatus (verified by state change) when progress reaches 1', () => {
      const { startTracking } = useLoadStatusStore.getState();
      
      startTracking();
      expect(useLoadStatusStore.getState().currentStatusProgress).toBe(0);

      const ticksToCompleteOneStatus = STATUS_UPDATE_INTERVAL / 100;

      jest.advanceTimersByTime((ticksToCompleteOneStatus - 1) * 100);
      expect(useLoadStatusStore.getState().currentStatusProgress).toBeCloseTo(1 - (1 / ticksToCompleteOneStatus), 5);
      expect(useLoadStatusStore.getState().currentStatusIndex).toBe(0);

      jest.advanceTimersByTime(100); 
      expect(useLoadStatusStore.getState().currentStatusProgress).toBeCloseTo(0); 
      expect(useLoadStatusStore.getState().currentStatusIndex).toBe(1); 
    });
  });
}); 