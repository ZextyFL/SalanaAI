// Global state
let orders = [];
let campaigns = [];
let alerts = [];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadInitialData();
    setupEventListeners();
    startBackgroundProcesses();
});

// Load initial data
function loadInitialData() {
    // Load from localStorage or initialize with sample data
    const savedOrders = localStorage.getItem('guruOrders');
    const savedCampaigns = localStorage.getItem('guruCampaigns');
    
    orders = savedOrders ? JSON.parse(savedOrders) : generateSampleOrders();
    campaigns = savedCampaigns ? JSON.parse(savedCampaigns) : generateSampleCampaigns();
    
    updateBadges();
}

// Generate sample orders
function generateSampleOrders() {
    const sampleOrders = [];
    const products = [
        { name: 'Premium Wireless Headphones', price: 299 },
        { name: 'Smart Watch Pro', price: 499 },
        { name: 'MacBook Air M2', price: 1299 },
        { name: 'iPhone 15 Pro', price: 1099 }
    ];
    
    const customers = [
        'Alex Chen', 'Sarah Johnson', 'Marcus Williams', 'Elena Rodriguez',
        'James Thompson', 'Priya Patel', 'Michael Kim', 'Emma Watson'
    ];
    
    for (let i = 0; i < 12; i++) {
        const product = products[Math.floor(Math.random() * products.length)];
        sampleOrders.push({
            id: 1000 + i,
            customer: customers[Math.floor(Math.random() * customers.length)],
            product: product.name,
            amount: product.price,
            status: i < 3 ? 'processing' : 'completed',
            time: new Date(Date.now() - i * 3600000).toLocaleTimeString(),
            date: new Date(Date.now() - i * 86400000).toISOString()
        });
    }
    
    return sampleOrders;
}

// Generate sample campaigns
function generateSampleCampaigns() {
    return [
        {
            id: 1,
            name: '🔥 Retargeting Pro',
            budget: 500,
            spent: 320,
            impressions: 85400,
            clicks: 4270,
            conversions: 198,
            platform: 'Facebook + Instagram',
            ctr: '5.0',
            status: 'active'
        },
        {
            id: 2,
            name: '🎯 Lookalike Audience',
            budget: 750,
            spent: 450,
            impressions: 128000,
            clicks: 5120,
            conversions: 245,
            platform: 'All Platforms',
            ctr: '4.0',
            status: 'active'
        },
        {
            id: 3,
            name: '📱 Mobile First',
            budget: 400,
            spent: 280,
            impressions: 67300,
            clicks: 3700,
            conversions: 156,
            platform: 'TikTok + Snapchat',
            ctr: '5.5',
            status: 'active'
        }
    ];
}

// Update badges
function updateBadges() {
    const orderBadge = document.getElementById('orderBadge');
    const alertBadge = document.getElementById('alertBadge');
    
    if (orderBadge) {
        const processingOrders = orders.filter(o => o.status === 'processing').length;
        orderBadge.textContent = processingOrders;
    }
    
    if (alertBadge) {
        alertBadge.textContent = alerts.length || 3;
    }
}

// Play sale sound
function playSaleSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;
    
    // Cha-ching sound
    const osc1 = audioContext.createOscillator();
    const gain1 = audioContext.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(800, now);
    osc1.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc1.connect(gain1);
    gain1.connect(audioContext.destination);
    
    const osc2 = audioContext.createOscillator();
    const gain2 = audioContext.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(600, now + 0.05);
    osc2.frequency.exponentialRampToValueAtTime(1000, now + 0.15);
    gain2.gain.setValueAtTime(0.2, now + 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    osc2.connect(gain2);
    gain2.connect(audioContext.destination);
    
    osc1.start(now);
    osc2.start(now + 0.05);
    osc1.stop(now + 0.3);
    osc2.stop(now + 0.35);
}

// Simulate new order
function simulateNewOrder() {
    const products = [
        { name: 'Premium Wireless Headphones', price: 299 },
        { name: 'Smart Watch Pro', price: 499 },
        { name: 'MacBook Air M2', price: 1299 },
        { name: 'iPhone 15 Pro', price: 1099 },
        { name: 'AirPods Max', price: 549 },
        { name: 'iPad Pro 12.9"', price: 1199 }
    ];
    
    const customers = [
        'Alex Chen', 'Sarah Johnson', 'Marcus Williams', 'Elena Rodriguez',
        'James Thompson', 'Priya Patel', 'Michael Kim', 'Emma Watson',
        'David Brown', 'Lisa Anderson', 'Robert Taylor', 'Maria Garcia'
    ];
    
    const product = products[Math.floor(Math.random() * products.length)];
    
    const newOrder = {
        id: 2000 + Math.floor(Math.random() * 1000),
        customer: customers[Math.floor(Math.random() * customers.length)],
        product: product.name,
        amount: product.price,
        status: 'processing',
        time: new Date().toLocaleTimeString(),
        date: new Date().toISOString()
    };

    orders.unshift(newOrder);
    localStorage.setItem('guruOrders', JSON.stringify(orders));
    
    playSaleSound();
    updateBadges();
    showToast(`🛍️ New order: $${newOrder.amount} from ${newOrder.customer}`);
    
    // Dispatch event for other pages
    window.dispatchEvent(new CustomEvent('newOrder', { detail: newOrder }));
}

// Start background processes
function startBackgroundProcesses() {
    // Simulate new orders every 30 seconds
    setInterval(simulateNewOrder, 30000);
    
    // Auto-fulfill orders
    setInterval(autoFulfillOrders, 15000);
}

// Auto-fulfill orders
function autoFulfillOrders() {
    const processingOrders = orders.filter(o => o.status === 'processing');
    
    if (processingOrders.length > 0) {
        const order = processingOrders[Math.floor(Math.random() * processingOrders.length)];
        order.status = 'completed';
        
        // Simulate supplier payment
        const supplierAmount = (order.amount * 0.6).toFixed(2);
        
        localStorage.setItem('guruOrders', JSON.stringify(orders));
        updateBadges();
        
        showToast(`✅ Order #${order.id} fulfilled. Paid supplier $${supplierAmount}`);
        
        // Dispatch event
        window.dispatchEvent(new CustomEvent('orderFulfilled', { detail: order }));
    }
}

// Show toast
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Format currency
function formatCurrency(amount) {
    return '$' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Format number
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Calculate metrics
function calculateMetrics() {
    const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
    const totalOrders = orders.length;
    const aov = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const processingOrders = orders.filter(o => o.status === 'processing').length;
    
    return {
        revenue: totalRevenue,
        orders: totalOrders,
        aov: aov,
        processing: processingOrders
    };
}

// Setup event listeners
function setupEventListeners() {
    // Listen for messages from iframes
    window.addEventListener('message', function(event) {
        if (event.data.type === 'showToast') {
            showToast(event.data.message);
        }
    });
}

// Export functions for use in iframes
window.guruAPI = {
    getOrders: () => orders,
    getCampaigns: () => campaigns,
    simulateNewOrder,
    showToast,
    playSaleSound,
    formatCurrency,
    formatNumber,
    calculateMetrics
};