export class StateManager {
  constructor() {
    this.subscribers = new Map();
    this._proxyCache = new WeakMap();
    this.state = this._wrap(this.getInitialState(), "");
  }

  getInitialState() {
    return {
      round: 1,
      phase: "action",
      isCollapsed: false,
      collapseChoice: null,
      global: {
        pastureHealth: 15,
        totalSheep: 0,
        sp: 0,
        banExpandRounds: 0,
      },
      players: [
        {
          id: "industrial",
          name: "Industrial Syndicate",
          sheep: 3,
          sp: 0,
          hasActed: false,
          hasTraded: false,
        },
        {
          id: "eco_pioneer",
          name: "Eco-pioneer",
          sheep: 3,
          sp: 0,
          hasActed: false,
          firstExpandUsed: false,
        },
        {
          id: "island_alliance",
          name: "Island Alliance",
          sheep: 3,
          sp: 0,
          hasActed: false,
        },
        {
          id: "resource_group",
          name: "Resource Group",
          sheep: 5,
          sp: 0,
          hasActed: false,
        },
        {
          id: "development",
          name: "Development Community",
          sheep: 3,
          sp: 0,
          hasActed: false,
          firstExpandUsed: false,
        },
      ],
      currentRound: {
        actions: {},
        trades: [],
        event: null,
        votes: {},
      },
      history: {
        events: [],
        rounds: [],
      },
    };
  }

  _wrap(target, basePath) {
    if (typeof target !== "object" || target === null) return target;
    if (this._proxyCache.has(target)) return this._proxyCache.get(target);

    const self = this;
    const proxy = new Proxy(target, {
      get(obj, prop, receiver) {
        const value = Reflect.get(obj, prop, receiver);
        if (typeof value === "object" && value !== null) {
          const childPath = basePath
            ? `${basePath}.${String(prop)}`
            : String(prop);
          return self._wrap(value, childPath);
        }
        return value;
      },
      set(obj, prop, value, receiver) {
        const oldValue = obj[prop];
        const result = Reflect.set(obj, prop, value, receiver);
        if (oldValue !== value) {
          const fullPath = basePath
            ? `${basePath}.${String(prop)}`
            : String(prop);
          self._notifyPath(fullPath, self._getByPath(fullPath));
          self._notifyParents(fullPath);
        }
        return result;
      },
      deleteProperty(obj, prop) {
        const existed = Object.prototype.hasOwnProperty.call(obj, prop);
        const result = Reflect.deleteProperty(obj, prop);
        if (existed && result) {
          const fullPath = basePath
            ? `${basePath}.${String(prop)}`
            : String(prop);
          self._notifyPath(fullPath, undefined);
          self._notifyParents(fullPath);
        }
        return result;
      },
    });

    this._proxyCache.set(target, proxy);
    return proxy;
  }

  _notifyParents(path) {
    const parts = path.split(".");
    for (let i = parts.length - 1; i > 0; i--) {
      const parentPath = parts.slice(0, i).join(".");
      this._notifyPath(parentPath, this._getByPath(parentPath));
    }
  }

  _notifyPath(path, value) {
    if (this.subscribers.has(path)) {
      this.subscribers.get(path).forEach((cb) => {
        try {
          cb(value);
        } catch (e) {
          console.error("Subscriber error:", e);
        }
      });
    }
  }

  _getByPath(path) {
    return path.split(".").reduce((acc, part) => acc && acc[part], this.state);
  }

  subscribe(path, callback) {
    if (!this.subscribers.has(path)) {
      this.subscribers.set(path, new Set());
    }
    this.subscribers.get(path).add(callback);

    return () => this.subscribers.get(path).delete(callback);
  }

  getState() {
    return this.state;
  }
}
